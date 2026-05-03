import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  ShoppingBag, 
  Package, 
  MessageCircle, 
  Calculator, 
  Calendar, 
  Star, 
  Sparkles,
  Gift,
  Truck,
  FileText,
  BadgeCheck,
  Zap,
  Ticket,
  ChevronLeft,
  ChevronRight,
  VolumeX
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ClayButton } from "./components/ClayButton";
import { ClayCard } from "./components/ClayCard";
import { FloatingBlobs } from "./components/FloatingBlobs";

const FAQ_ITEMS = [
  {
    question: "Preciso de experiência na cozinha?",
    answer: "Não! O método foi desenhado para quem está começando do zero. As receitas têm medidas exatas e o passo a passo é ilustrado."
  },
  {
    question: "Como recebo o acesso?",
    answer: "A entrega é imediata. Assim que o pagamento for confirmado, você recebe o acesso ao portal e a todos os guias em PDF no seu e-mail."
  },
  {
    question: "E se eu não morar em Minas Gerais?",
    answer: "Os doces juninos mineiros são amados em todo o Brasil. Você pode aplicar o método em qualquer cidade e vender o sabor autêntico de Minas."
  }
];

const DELIVERABLES = [
  { title: "As 12 Receitas Campeãs", desc: "Paçoquinha, cocada, pé de moleque e muito mais com segredos de vovó.", icon: Zap },
  { title: "Guia da Embalagem", desc: "Como montar kits presenteáveis que valorizam seu produto em até R$ 15.", icon: Package },
  { title: "Script Zenzap", desc: "Textos prontos para copiar e colar no seu WhatsApp e fechar encomendas.", icon: MessageCircle },
  { title: "Tabela de Precificação", desc: "Saiba exatamente quanto cobrar para ter lucro real em cada doce.", icon: Calculator },
  { title: "Plano de 30 Dias", desc: "Cronograma completo da primeira divulgação até a última entrega.", icon: Calendar },
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isMuted) {
        // First click: Unmute, restart from begining and ensure it's playing
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => console.error("Playback failed:", err));
        setIsMuted(false);
        setIsPlaying(true);
      } else {
        // Subsequent clicks: Standard play/pause toggle
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  // Attempt to play on mount (for mobile/tablet browsers that allow muted autoplay)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 640 ? 400 : 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-clay-accent/30 selection:text-white">
      <FloatingBlobs />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-44 pb-12 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/50 border border-white/50 rounded-full shadow-sm mb-4 sm:mb-8 animate-clay-breathe">
            <Sparkles size={14} className="text-clay-warning sm:w-4 sm:h-4" />
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-clay-muted">Sucesso de Vendas em Junho</span>
          </div>
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black leading-tight sm:leading-[1.1] mb-4 sm:mb-8 clay-text-gradient tracking-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Transforme sua cozinha <br className="hidden sm:block" /> em uma fábrica de Arraial.
          </h1>
          <p className="text-sm sm:text-xl lg:text-2xl text-clay-muted max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 sm:px-4">
            Pare de apenas assistir a festa dos outros. Aprenda o <strong>Método Docinho de Minas</strong> e 
            venda as receitas mais amadas de Minas Gerais por encomenda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4">
            <ClayButton 
              id="cta-hero"
              href="https://payfast.greenn.com.br/171982/offer/FpS9c3"
              size="lg" 
              className="w-full sm:w-auto gap-2 group bg-linear-to-br from-emerald-400 to-emerald-600 px-8 h-14 sm:h-16"
            >
              Quero minha renda extra <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </ClayButton>
            <div className="flex items-center gap-2 text-clay-muted font-bold text-[10px] sm:text-sm bg-white/40 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
              <Check className="text-clay-success" size={14} /> Acesso Imediato
            </div>
          </div>
        </motion.div>
      </section>

      {/* Opportunity Section */}
      <section id="o-curso" className="py-8 sm:py-20 px-3 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
        <ClayCard className="bg-linear-to-br from-white/80 to-clay-warning/5 border border-white/50 p-5 sm:p-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-4xl font-black mb-4 sm:mb-6 text-clay-foreground leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Junho é o mês do dinheiro em Minas Gerais
              </h2>
              <div className="space-y-3 sm:space-y-4 text-clay-muted text-sm sm:text-lg">
                <p>Escolas, empresas e famílias gastam centenas de reais todo ano em doces juninos.</p>
                <p>A maioria compra produtos industriais sem sabor. Você pode ser a fornecedora do sabor de verdade.</p>
                <p>Com o sabor da quitanda de avó e embalagens que vendem sozinhas, sua agenda vai lotar antes mesmo do arraial começar.</p>
              </div>
              <div className="mt-6 sm:mt-8 flex justify-center md:justify-start gap-4 sm:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-clay-success/10 flex items-center justify-center text-clay-success mb-2 shadow-sm">
                    <Check size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <span className="text-[9px] font-black text-clay-muted uppercase tracking-tighter">Zero Estoque</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-clay-accent/10 flex items-center justify-center text-clay-accent mb-2 shadow-sm">
                    <ShoppingBag size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <span className="text-[9px] font-black text-clay-muted uppercase tracking-tighter">Venda Direta</span>
                </div>
              </div>
            </div>
            <div className="relative mt-4 md:mt-0">
              <div className="w-full aspect-square max-w-[280px] sm:max-w-none mx-auto rounded-[32px] sm:rounded-[48px] bg-linear-to-br from-clay-warning to-clay-accent-secondary shadow-clay-surface flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-[120%] h-[120%] opacity-20 border-[20px] border-dashed border-white rounded-full"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                  <span className="text-5xl sm:text-7xl font-black mb-2 sm:mb-4">MGM</span>
                  <p className="font-bold text-lg sm:text-xl px-4">Arraial Lucrativo <br className="hidden sm:block" /> Em 30 Dias</p>
                </div>
              </div>
            </div>
          </div>
        </ClayCard>
      </section>

      {/* What you get */}
      <section id="o-que-voce-recebe" className="py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-5xl font-black mb-3 sm:mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>O Que Você Vai Receber</h2>
          <p className="text-clay-muted text-sm sm:text-lg max-w-xl mx-auto px-4">Entrega imediata de todo o material necessário para começar hoje mesmo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {DELIVERABLES.map((item, i) => (
            <ClayCard key={i} className="group hover:bg-white/80 p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-clay-accent/10 flex items-center justify-center text-clay-accent mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <item.icon size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.title}</h3>
              <p className="text-clay-muted text-[13px] sm:text-base leading-relaxed">{item.desc}</p>
            </ClayCard>
          ))}
          
          <ClayCard className="bg-linear-to-br from-clay-accent to-clay-accent-secondary text-white sm:col-span-2 lg:col-span-1 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Acesso Vitalício</h3>
            <p className="opacity-90 mb-6 text-sm sm:text-base">Pague uma vez e use todos os anos para lucrar no seu arraial.</p>
            <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-white"
              />
            </div>
          </ClayCard>
        </div>
      </section>

      {/* Bonuses */}
      <section id="bonus" className="py-12 sm:py-24 bg-white/40 border-y border-white/50 backdrop-blur-xl px-4 sm:px-6 relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-clay-accent-secondary text-white rounded-full text-[9px] sm:text-[10px] font-black uppercase mb-3 sm:mb-4 shadow-clay-button">
              Só neste Lançamento
            </div>
            <h2 className="text-2xl sm:text-5xl font-black mb-4 sm:mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>Bônus Exclusivos</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {[
              { title: "Fornecedores de MG", desc: "Contatos de atacadistas para comprar amendoim, coco e embalagens a preço de custo.", icon: Truck },
              { title: "Cardápio PDF Editável", desc: "Arquivo pronto com fotos e nomes dos doces. Só imprimir ou mandar no WhatsApp.", icon: FileText },
              { title: "Roteiro Escola & Empresa", desc: "Script específico para fechar encomendas grandes e turbinar seus ganhos.", icon: Ticket },
              { title: "Calculadora de Lucro", desc: "Ferramenta automática para saber exatamente quanto você ganha em cada kit.", icon: Calculator }
            ].map((bonus, i) => (
              <ClayCard key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 sm:p-8 hover:bg-white transition-all group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-linear-to-br from-clay-warning to-clay-accent-secondary text-white flex shrink-0 items-center justify-center shadow-clay-button group-hover:rotate-6 transition-transform">
                  <bonus.icon size={24} className="sm:w-8 sm:h-8" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-1 sm:mb-2 text-left">
                    <h4 className="font-bold text-base sm:text-xl" style={{ fontFamily: 'Nunito, sans-serif' }}>{bonus.title}</h4>
                    <span className="text-clay-success font-black text-[9px] sm:text-xs uppercase tracking-widest pl-2">Grátis</span>
                  </div>
                  <p className="text-clay-muted text-[13px] sm:text-base text-left">{bonus.desc}</p>
                </div>
              </ClayCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sweets - Carousel or Grid */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        <h2 className="text-2xl sm:text-4xl font-black mb-10 sm:mb-16 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>As Estrelas do Seu Cardápio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {[
            { 
              name: "Paçoquinha Cremosa", 
              desc: "A rainha de MG. Feita com amendoim torrado na hora — sabor inesquecível.", 
              tag: "Mais Pedida", 
              image: "https://i.postimg.cc/Xq82mxTf/1951b2e2-receitapacocadecolher.webp" 
            },
            { 
              name: "Cocada de Corte", 
              desc: "Firme por fora, úmida por dentro. O clássico das quitandas de interior.", 
              tag: "Tradicional", 
              image: "https://i.postimg.cc/GmZjMZ43/cocada-de-corte-1596566618358-v2-4x3.jpg" 
            },
            { 
              name: "Bolo de Milho Úmido", 
              desc: "Fácil, rápido e o mais pedido em festas escolares de todo o estado.", 
              tag: "Fácil", 
              image: "https://i.postimg.cc/X7PKJTcZ/bolo-de-milho-640w.webp" 
            }
          ].map((sweet, i) => (
            <ClayCard key={i} className="p-0 overflow-hidden group">
              <div className="h-48 sm:h-56 bg-linear-to-br from-clay-accent/10 to-clay-accent/5 relative overflow-hidden">
                <img 
                  src={sweet.image} 
                  alt={sweet.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 bg-white/90 rounded-full text-[9px] font-black uppercase tracking-widest text-clay-accent shadow-sm backdrop-blur-sm">
                  {sweet.tag}
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>{sweet.name}</h3>
                <p className="text-clay-muted text-[13px] sm:text-base mb-4 sm:mb-6 leading-relaxed">{sweet.desc}</p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-clay-success" />
                  <div className="w-2 h-2 rounded-full bg-clay-success/50" />
                  <div className="w-2 h-2 rounded-full bg-clay-success/20" />
                </div>
              </div>
            </ClayCard>
          ))}
        </div>
      </section>

      {/* Testimonials - Image Carousel */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden relative">
        <h2 className="text-xl sm:text-3xl font-black mb-8 sm:mb-12 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>Quem Já Lucra Com o Arraial</h2>
        
        {/* Featured Video */}
        <div className="flex justify-center mb-10 sm:mb-16 px-2 sm:px-4">
          <div 
            className="relative cursor-pointer group/video max-w-fit mx-auto"
            onClick={handleVideoClick}
          >
            {/* Audio Warning Overlay */}
            <AnimatePresence>
              {isMuted && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 left-4 right-4 z-10 pointer-events-none"
                >
                  <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 animate-bounce mx-auto w-fit shadow-lg border border-white/20">
                    <VolumeX size={14} className="animate-pulse" /> Clique para assistir com áudio
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <video 
              ref={videoRef}
              src="https://www.dropbox.com/scl/fi/fxdx084lty3lzy0j8v1b3/0429.mp4?rlkey=gagotnki335btek96f2h2vrnr&st=obqmnb9w&raw=1" 
              loop
              playsInline
              autoPlay
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="rounded-[18px] sm:rounded-[24px] h-[380px] sm:h-[800px] lg:h-[850px] w-auto block shadow-2xl transition-all duration-700"
            />
            
            {/* Play/Pause Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying && !isMuted ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-clay-accent/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-clay-button transform group-hover/video:scale-110 transition-transform">
                {isPlaying ? (
                  <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full" />
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white rounded-full" />
                  </div>
                ) : (
                  <div className="ml-1 sm:ml-1.5 w-0 h-0 border-t-[10px] sm:border-t-[15px] border-t-transparent border-l-[18px] sm:border-l-[25px] border-l-white border-b-[10px] sm:border-b-[15px] border-b-transparent" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group/carousel">
          <div 
            ref={carouselRef}
            className="flex gap-4 sm:gap-8 overflow-x-auto pb-8 sm:pb-12 px-4 -mx-4 no-scrollbar snap-x touch-pan-x scroll-smooth"
          >
            {[
              "https://i.postimg.cc/15Dw7zND/image.png",
              "https://i.postimg.cc/W1bzmpGY/image.png",
              "https://i.postimg.cc/TYT3G24h/image.png"
            ].map((url, i) => (
              <ClayCard key={i} className="p-2 sm:p-3 min-w-fit snap-center bg-white/40 border border-white/50 shadow-clay-card flex-none hover:rotate-1 transition-transform">
                <img 
                  src={url} 
                  alt={`Depoimento ${i + 1}`} 
                  className="rounded-[14px] sm:rounded-[20px] h-[380px] sm:h-[600px] w-auto max-w-none block shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </ClayCard>
            ))}
          </div>

          {/* Desktop Navigation Arrows */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/50 items-center justify-center text-clay-muted shadow-clay-button opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex hover:text-clay-accent active:shadow-clay-pressed"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scrollCarousel('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/50 items-center justify-center text-clay-muted shadow-clay-button opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex hover:text-clay-accent active:shadow-clay-pressed"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Subtle Mobile Navigation Arrows */}
          <div className="flex lg:hidden justify-center items-center gap-10 mt-4 opacity-40">
             <button 
               onClick={() => scrollCarousel('left')}
               className="p-3 bg-white/20 rounded-full active:bg-white/40 transition-colors"
               aria-label="Anterior"
             >
               <ChevronLeft size={20} className="text-clay-muted" />
             </button>
             <button 
               onClick={() => scrollCarousel('right')}
               className="p-3 bg-white/20 rounded-full active:bg-white/40 transition-colors"
               aria-label="Próximo"
             >
               <ChevronRight size={20} className="text-clay-muted" />
             </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-24 px-3 sm:px-6 max-w-7xl mx-auto text-center border-t border-white/50">
        <ClayCard className="max-w-2xl mx-auto p-6 sm:p-14 bg-linear-to-br from-white to-[#F9F7FC] shadow-clay-surface relative overflow-visible">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8 leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>Comece Hoje Mesmo</h2>
          
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 mb-8 sm:mb-10">
            <span className="text-clay-muted line-through text-sm sm:text-lg opacity-60">De R$ 197,00</span>
            <div className="text-5xl sm:text-8xl font-black text-clay-accent-secondary drop-shadow-sm flex items-start gap-0.5" style={{ fontFamily: 'Nunito, sans-serif' }}>
              <span className="text-xl sm:text-4xl mt-2 sm:mt-4">R$</span>
              27
              <span className="text-xl sm:text-4xl mt-2 sm:mt-4">,00</span>
            </div>
            <span className="bg-clay-accent/10 px-3 py-1 rounded-full text-clay-accent font-black uppercase tracking-[0.2em] text-[8px] sm:text-[10px]">Pagamento Único</span>
          </div>

          <div className="space-y-3 sm:space-y-4 text-left mb-8 sm:mb-12 max-w-md mx-auto">
            {[
              "12 Receitas Juninas Mineiras Pro",
              "Guia de Embalagem & Kits",
              "Todos os 4 Bônus Exclusivos",
              "Acesso Vitalício & Atualizações"
            ].map((check, i) => (
              <div key={i} className="flex gap-3 sm:gap-4 items-center font-bold text-[13px] sm:text-base">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-clay-success flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Check size={12} className="sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="text-clay-foreground/80">{check}</span>
              </div>
            ))}
          </div>

          <ClayButton 
            id="cta-pricing"
            href="https://payfast.greenn.com.br/171982/offer/FpS9c3"
            size="lg" 
            className="w-full h-16 sm:h-20 text-lg sm:text-2xl shadow-xl shadow-emerald-500/30 bg-linear-to-br from-emerald-400 to-emerald-600"
          >
            Quero Todos os Bônus →
          </ClayButton>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-clay-muted text-[8px] sm:text-[10px] font-black uppercase tracking-widest bg-white/50 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl">
            <span>Pix · Cartão</span>
            <span className="hidden sm:inline opacity-30 text-lg">|</span>
            <span className="flex items-center gap-1.5"><BadgeCheck size={16} className="text-clay-success sm:w-4.5 sm:h-4.5" /> Compra 100% Segura</span>
          </div>
        </ClayCard>
      </section>

      {/* Guarantee Section */}
      <section id="garantia" className="py-16 sm:py-24 px-6 max-w-4xl mx-auto text-center scroll-mt-24">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600 mb-8 border-4 border-white shadow-clay-button animate-clay-breathe">
          <BadgeCheck size={40} className="sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>Garantia "Encomenda ou Seu Dinheiro de Volta"</h2>
        <p className="text-clay-muted text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Você tem 15 dias para testar. Se você fizer qualquer uma das receitas, mandar no WhatsApp e não receber nenhum pedido, eu te devolvo cada centavo. Sem burocracia.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black mb-8 sm:mb-12 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>Dúvidas Frequentes</h2>
        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i} className="overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className={`
                  w-full flex items-center justify-between p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] text-left transition-all duration-300 group
                  ${activeFaq === i ? 'bg-white shadow-clay-card' : 'bg-[#EFEBF5] shadow-clay-pressed hover:bg-white'}
                `}
              >
                <span className="font-bold text-sm sm:text-lg pr-4" style={{ fontFamily: 'Nunito, sans-serif' }}>{faq.question}</span>
                <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-clay-accent' : 'text-clay-muted group-hover:text-clay-accent'}`} />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="px-5 py-5 sm:px-8 sm:py-8 text-clay-muted leading-relaxed text-[13px] sm:text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-20 px-6 max-w-7xl mx-auto border-t border-white/50">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-clay-accent shadow-clay-button flex items-center justify-center text-white">
                <Star size={18} fill="currentColor" className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-display font-black text-xl sm:text-2xl uppercase tracking-tighter" style={{ fontFamily: 'Nunito, sans-serif' }}>Docinho De Minas</span>
            </div>
            <p className="text-clay-muted font-bold text-[11px] sm:text-sm max-w-xs opacity-70">
              O guia definitivo para lucrar docemente no Arraial Mineiro.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-10 uppercase tracking-widest font-black text-[9px] sm:text-[10px]">
            <a href="#" className="text-clay-muted hover:text-clay-accent transition-colors">Privacidade</a>
            <a href="#" className="text-clay-muted hover:text-clay-accent transition-colors">Termos</a>
            <a href="#" className="text-clay-muted hover:text-clay-accent transition-colors">Contato</a>
          </div>
        </div>
        <div className="mt-12 sm:mt-20 text-center text-[8px] sm:text-[10px] font-black text-clay-muted/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] px-4">
          &copy; 2026 MÉTODO DOCINHO DE MINAS — TODOS OS DIREITOS RESERVADOS
        </div>
      </footer>
      
    </div>
  );
}


