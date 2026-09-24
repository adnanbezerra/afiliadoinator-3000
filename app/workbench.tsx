/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Archive, ArrowUpRight, BadgeCheck, Check, ChevronRight, CircleAlert,
  Clock3, ExternalLink, FileSearch, Filter, ImageIcon, LoaderCircle, Menu,
  MessageCircle, PackageSearch, Radio, Search, Send, SlidersHorizontal, Star, X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { PublicUser } from "@/src/modules/identity/application/shared/UserRepository";
import type { MarketplaceId } from "@/src/modules/marketplaces/application/shared/Product";
import { LogoutButton } from "./logout-button";
import styles from "./page.module.css";

type Section = "buscar" | "canais" | "disparos";
type ActiveProvider = Exclude<MarketplaceId, "shopee">;
type Product = {
  provider: MarketplaceId; externalId: string; title: string; currentPrice: number;
  originalPrice?: number; currency: "BRL"; discountPercentage?: number;
  imageUrl?: string; productUrl: string; affiliateUrl?: string; rating?: number;
};

const providers: Array<{ id: ActiveProvider; label: string }> = [
  { id: "amazon", label: "Amazon" },
  { id: "aliexpress", label: "AliExpress" },
  { id: "mercado-livre", label: "Mercado Livre" },
];
const providerNames: Record<MarketplaceId, string> = {
  amazon: "Amazon", aliexpress: "AliExpress", "mercado-livre": "Mercado Livre", shopee: "Shopee",
};
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const userInitials = (name: string) => name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();

export function Workbench({ user }: { user: PublicUser }) {
  const [section, setSection] = useState<Section>("buscar");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (next: Section) => { setSection(next); setMenuOpen(false); };

  return (
    <main className={styles.appShell}>
      <button className={styles.mobileMenuButton} type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <a className={styles.brand} href="#top" onClick={() => navigate("buscar")}>
          <span>Afiliado</span><strong>inator 3000</strong><small>Bancada de curadoria</small>
        </a>
        <nav className={styles.nav} aria-label="Navegação principal">
          <NavButton active={section === "buscar"} icon={<PackageSearch size={18} />} onClick={() => navigate("buscar")}>Buscar</NavButton>
          <NavButton active={section === "canais"} icon={<Radio size={18} />} onClick={() => navigate("canais")}>Canais</NavButton>
          <NavButton active={section === "disparos"} icon={<Send size={18} />} onClick={() => navigate("disparos")}>Disparos</NavButton>
        </nav>
        <div className={styles.operator}>
          <span className={styles.avatar}>{userInitials(user.name)}</span>
          <div><strong>{user.name}</strong><span>{user.email}</span></div>
          <LogoutButton />
        </div>
      </aside>
      <div className={styles.workspace} id="top">
        {section === "buscar" && <SearchWorkspace />}
        {section === "canais" && <Channels />}
        {section === "disparos" && <Dispatches />}
      </div>
    </main>
  );
}

function NavButton({ active, icon, onClick, children }: { active: boolean; icon: React.ReactNode; onClick: () => void; children: React.ReactNode }) {
  return <button className={active ? styles.navActive : ""} type="button" onClick={onClick}>{icon}{children}<ChevronRight className={styles.navArrow} size={15} /></button>;
}

function SearchWorkspace() {
  const [query, setQuery] = useState("");
  const [activeProviders, setActiveProviders] = useState<ActiveProvider[]>(providers.map(({ id }) => id));
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState<ActiveProvider[]>([]);
  const [errors, setErrors] = useState<Partial<Record<ActiveProvider, string>>>({});
  const [requestedProviderCount, setRequestedProviderCount] = useState(0);
  const [searched, setSearched] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
  const [sort, setSort] = useState("relevance");
  const [prepared, setPrepared] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const visibleProducts = useMemo(() => {
    const minimum = minPrice ? Number(minPrice) : 0;
    const maximum = maxPrice ? Number(maxPrice) : Infinity;
    const rating = minRating ? Number(minRating) : 0;
    const list = products.filter((product) => product.currentPrice >= minimum && product.currentPrice <= maximum && (product.rating ?? 0) >= rating && (!onlyDiscounts || Boolean(product.discountPercentage)));
    if (sort === "price-asc") return [...list].sort((a, b) => a.currentPrice - b.currentPrice);
    if (sort === "discount") return [...list].sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0));
    return list;
  }, [products, minPrice, maxPrice, minRating, onlyDiscounts, sort]);

  const toggleProvider = (provider: ActiveProvider) => setActiveProviders((current) => current.includes(provider) ? current.filter((item) => item !== provider) : [...current, provider]);

  async function searchProducts(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (term.length < 2 || activeProviders.length === 0) return;
    setSearched(true); setProducts([]); setSelected(null); setPrepared(null); setErrors({}); setRequestedProviderCount(activeProviders.length); setLoading(activeProviders);
    await Promise.all(activeProviders.map(async (provider) => {
      try {
        const params = new URLSearchParams({ provider, q: term, page: "1", pageSize: "10" });
        const response = await fetch(`/api/products/search?${params}`);
        if (!response.ok) throw new Error(String(response.status));
        const result = (await response.json()) as { products: Product[] };
        setProducts((current) => [...current, ...result.products]);
      } catch {
        setErrors((current) => ({ ...current, [provider]: "Fonte indisponível" }));
      } finally {
        setLoading((current) => current.filter((item) => item !== provider));
      }
    }));
  }

  const isSearching = loading.length > 0;
  const hasErrors = Object.keys(errors).length > 0;
  const allSourcesFailed = !isSearching && requestedProviderCount > 0 && Object.keys(errors).length === requestedProviderCount;
  return (
    <div className={styles.searchWorkspace}>
      <PageHeader kicker="Mesa de trabalho" title="Buscar produtos" trailing={<span className={styles.dateStamp}>Curadoria humana <BadgeCheck size={16} /></span>} />
      <form className={styles.searchForm} onSubmit={searchProducts}>
        <label className={styles.searchField}>
          <Search size={21} /><span className={styles.srOnly}>Termo, URL ou produto</span>
          <input ref={inputRef} autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Termo, URL ou produto…" minLength={2} />
          <kbd>⌘ K</kbd>
        </label>
        <button className={styles.searchButton} type="submit" disabled={query.trim().length < 2 || activeProviders.length === 0 || isSearching}>
          {isSearching ? <LoaderCircle className={styles.spin} size={18} /> : <Search size={18} />}{isSearching ? "Buscando" : "Buscar"}
        </button>
        <div className={styles.providerRow}>
          <span>Fontes</span>
          {providers.map((provider) => {
            const active = activeProviders.includes(provider.id);
            return <button key={provider.id} className={active ? styles.providerActive : ""} type="button" aria-pressed={active} onClick={() => toggleProvider(provider.id)}>
              <span>{active && <Check size={12} />}</span>{provider.label}{loading.includes(provider.id) && <LoaderCircle className={styles.spin} size={13} />}
            </button>;
          })}
          <button className={styles.providerSoon} type="button" disabled>Shopee <small>Em breve</small></button>
          <button className={styles.filterToggle} type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={15} /> Filtros</button>
        </div>
        {filtersOpen && <div className={styles.filters}>
          <FilterField label="Preço mínimo"><input type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="R$ 0" /></FilterField>
          <FilterField label="Preço máximo"><input type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Sem limite" /></FilterField>
          <FilterField label="Avaliação mínima"><select value={minRating} onChange={(event) => setMinRating(event.target.value)}><option value="">Qualquer</option><option value="3">3 ou mais</option><option value="4">4 ou mais</option><option value="4.5">4,5 ou mais</option></select></FilterField>
          <label className={styles.checkboxLabel}><input type="checkbox" checked={onlyDiscounts} onChange={(event) => setOnlyDiscounts(event.target.checked)} />Somente com desconto</label>
        </div>}
      </form>

      <section className={styles.results} aria-busy={isSearching}>
        <div className={styles.resultsHeader}>
          <div><h2>Produtos encontrados</h2><span>{searched ? `${visibleProducts.length} ${visibleProducts.length === 1 ? "resultado" : "resultados"}` : "A busca começa aqui"}</span></div>
          <label><span>Ordenar</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevance">Relevância</option><option value="price-asc">Menor preço</option><option value="discount">Maior desconto</option></select></label>
        </div>
        {hasErrors && <div className={styles.partialAlert} role="status"><CircleAlert size={18} /><div><strong>{allSourcesFailed ? "Não foi possível concluir a busca" : "Busca concluída parcialmente"}</strong><span>{allSourcesFailed ? "Nenhuma fonte respondeu. Verifique as conexões e tente novamente." : `${Object.keys(errors).map((provider) => providerNames[provider as MarketplaceId]).join(", ")} não respondeu. Os demais resultados continuam disponíveis.`}</span></div></div>}
        {isSearching && products.length === 0 && <div className={styles.loadingList} aria-label="Buscando produtos">{[0, 1, 2].map((item) => <div key={item} />)}</div>}
        {!isSearching && !searched && <EmptySearch inputRef={inputRef} setQuery={setQuery} />}
        {!isSearching && searched && visibleProducts.length === 0 && !hasErrors && <Empty icon={<PackageSearch size={32} />} title="Nenhum produto encontrado" text="Tente um termo mais amplo ou ative outras fontes de busca." />}
        {allSourcesFailed && <Empty icon={<CircleAlert size={32} />} title="Fontes indisponíveis" text="A busca não trouxe resultados. Revise as configurações dos marketplaces antes de tentar novamente." />}
        {visibleProducts.length > 0 && <div className={styles.productList}>{visibleProducts.map((product) => <ProductRow key={`${product.provider}-${product.externalId}`} product={product} selected={selected?.externalId === product.externalId && selected.provider === product.provider} onSelect={() => setSelected(product)} />)}</div>}
      </section>
      {selected && <ProductSheet product={selected} prepared={prepared === selected.externalId} onClose={() => setSelected(null)} onPrepare={() => setPrepared(selected.externalId)} />}
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) { return <label>{label}{children}</label>; }
function PageHeader({ kicker, title, trailing }: { kicker: string; title: string; trailing?: React.ReactNode }) { return <header className={styles.workspaceHeader}><div><span className={styles.kicker}>{kicker}</span><h1>{title}</h1></div>{trailing}</header>; }
function Empty({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className={styles.emptyState}>{icon}<h3>{title}</h3><p>{text}</p></div>; }
function EmptySearch({ inputRef, setQuery }: { inputRef: React.RefObject<HTMLInputElement | null>; setQuery: (value: string) => void }) {
  return <div className={styles.emptyState}><FileSearch size={32} /><h3>O que entra na bancada hoje?</h3><p>Pesquise nas fontes ativas e compare sem perder o contexto.</p><div>{["fone bluetooth", "cafeteira elétrica", "cadeira de escritório"].map((example) => <button key={example} type="button" onClick={() => { setQuery(example); inputRef.current?.focus(); }}>{example}<ArrowUpRight size={13} /></button>)}</div></div>;
}

function ProductRow({ product, selected, onSelect }: { product: Product; selected: boolean; onSelect: () => void }) {
  return <article className={`${styles.productRow} ${selected ? styles.productSelected : ""}`}>
    <ProductImage product={product} className={styles.productImage} />
    <div className={styles.productSummary}><span className={styles.source}>{providerNames[product.provider]}</span><h3>{product.title}</h3><div className={styles.productMeta}>{product.rating !== undefined && <span><Star size={14} fill="currentColor" /> {product.rating.toFixed(1)}</span>}<span className={product.affiliateUrl ? styles.linkReady : styles.linkMissing}>{product.affiliateUrl ? "Link de afiliado disponível" : "Sem link de afiliado"}</span></div></div>
    <div className={styles.priceBlock}>{product.originalPrice && product.originalPrice > product.currentPrice && <del>{money.format(product.originalPrice)}</del>}<strong>{money.format(product.currentPrice)}</strong>{product.discountPercentage !== undefined && <span>−{Math.round(product.discountPercentage)}%</span>}</div>
    <button className={styles.selectButton} type="button" onClick={onSelect}>{selected ? "Selecionado" : "Selecionar"}<ChevronRight size={16} /></button>
  </article>;
}

function ProductImage({ product, className }: { product: Product; className: string }) {
  return <div className={className}>{product.imageUrl ? <img src={product.imageUrl} alt="" /> : <ImageIcon size={28} />}</div>;
}

function ProductSheet({ product, prepared, onClose, onPrepare }: { product: Product; prepared: boolean; onClose: () => void; onPrepare: () => void }) {
  return <aside className={styles.productSheet} aria-label="Ficha do produto selecionado">
    <div className={styles.sheetClip} aria-hidden="true" /><header><span>Ficha selecionada</span><button type="button" onClick={onClose} aria-label="Fechar ficha"><X size={18} /></button></header>
    <ProductImage product={product} className={styles.sheetImage} /><span className={styles.sheetSource}>{providerNames[product.provider]}</span><h2>{product.title}</h2>
    <div className={styles.sheetPrice}><strong>{money.format(product.currentPrice)}</strong>{product.originalPrice && product.originalPrice > product.currentPrice && <del>{money.format(product.originalPrice)}</del>}</div>
    <dl className={styles.sheetFacts}><div><dt>Avaliação</dt><dd>{product.rating !== undefined ? `${product.rating.toFixed(1)} de 5` : "Não informada"}</dd></div><div><dt>Desconto</dt><dd>{product.discountPercentage !== undefined ? `${Math.round(product.discountPercentage)}%` : "Não informado"}</dd></div><div><dt>Link de afiliado</dt><dd>{product.affiliateUrl ? "Disponível" : "Indisponível"}</dd></div></dl>
    <a className={styles.offerLink} href={product.productUrl} target="_blank" rel="noreferrer">Ver oferta original <ExternalLink size={14} /></a>
    <div className={styles.approvalNote}><BadgeCheck size={18} /><span><strong>Aprovação obrigatória</strong>Nada será publicado sem sua revisão.</span></div>
    <button className={styles.prepareButton} type="button" onClick={onPrepare} disabled={prepared}>{prepared ? <Check size={18} /> : <Archive size={18} />}{prepared ? "Preparação iniciada" : "Preparar publicação"}</button>
  </aside>;
}

function Channels() {
  return <section className={styles.secondaryPage}><PageHeader kicker="Destinos" title="Canais" /><p className={styles.pageIntro}>Conecte os destinos usados na publicação. Nenhuma integração é simulada antes da configuração real.</p><div className={styles.channelList}>
    <article><span className={styles.channelIcon}><Send size={21} /></span><div><h2>Telegram</h2><p>Bot, destino e teste de envio.</p></div><span className={styles.notConfigured}>Não configurado</span><button type="button">Configurar</button></article>
    <article><span className={styles.channelIcon}><MessageCircle size={21} /></span><div><h2>WhatsApp</h2><p>Aguardando escolha do provedor.</p></div><span className={styles.notConfigured}>Não configurado</span><button type="button" disabled>Configuração pendente</button></article>
  </div></section>;
}

function Dispatches() {
  return <section className={styles.secondaryPage}><PageHeader kicker="Histórico operacional" title="Disparos" /><div className={styles.dispatchFilters}><button type="button"><Filter size={15} />Todos os canais</button><button type="button"><Clock3 size={15} />Qualquer período</button><button type="button">Todos os estados</button></div><div className={styles.dispatchTable} role="table" aria-label="Histórico de disparos"><div role="row" className={styles.tableHeader}><span>Data</span><span>Produto</span><span>Canal</span><span>Destino</span><span>Estado</span></div><div className={styles.tableEmpty}><Send size={28} /><h2>Nenhum disparo registrado</h2><p>Publicações preparadas e enviadas aparecerão aqui com estado e resumo de erro.</p></div></div></section>;
}
