import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden node-bg">
      {/* Floating 3D Node Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent rounded-full filter blur-[150px]"></div>
      </div>

      <div className="layout-container flex h-full grow flex-col relative z-10">
        {/* Navigation */}
        <header className="sticky top-0 z-50 glass border-b border-white/10 px-6 lg:px-20 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white text-2xl">auto_awesome</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">ChainSpeak</h2>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Features</Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Security</Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Docs</Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Ecosystem</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex px-5 py-2.5 rounded-lg border border-primary/50 text-primary text-sm font-bold hover:bg-primary/10 transition-all">
                Connect Wallet
              </button>
              <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/25 transition-all">
                Launch App
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12 md:py-24">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Mainnet Beta Live</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                Talk to Your <br />
                <span className="text-gradient">Blockchain</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                The first Web3 AI agent that executes complex on-chain transactions using simple natural language. Secure, fast, and multi-chain.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <button className="btn-gradient text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                  Try Live Demo
                </button>
                <button className="glass border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all">
                  Read Whitepaper
                </button>
              </div>
              <div className="flex items-center gap-6 mt-6 opacity-60">
                <img className="h-6 grayscale brightness-200" alt="Security audit partner logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApnhrhAODEvfVWVfVU4RCBJ0cf5BueIecqw8jULmqkWQtU5ceTYclh8d_x4L42YKxBFgeZfyFLQ-Gk_5d1dBznAaXpPzQo2s_CPGHjdPD0uF0netbThHrwedf1FWa_DZhu6GyYfaVTf6S3GyA_Fr3NjeiQbZ3XKnXdsxM9rQlq8UaHTDZzxYJH_AVUoMGypZj6sgbVZZBoMh9gEc3_9bt12WV__lWylwwXYNi2RtSsulkoqXQg3d9lDOGUm1KxxhR9YNJgk0avgVg" />
                <img className="h-6 grayscale brightness-200" alt="Blockchain network logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtNDMRH_uLQoS1tfz7Ml8f-XDwtmahkog79jQL2ELcbUkbyhmbhGw_cK6ZuWN0yngRNsJfhNEkXLLgZEimumS81Dky7vLv8sda7Etgdg8II2Rkpe7ab_pB_gjMAnhz_roZA_UAjDFtIIhG6YNVC4Rp5Tt4olBugSgISRSJ9bE3fVupAAhDJEAtsYy37A-1iyVy4azagENcF-1tQVgAoA2ovkKzUlv-wmYbvOVa77bP6q48PmaxO-c1QQnXxpEGgIuhu1UT5pybhKY" />
                <img className="h-6 grayscale brightness-200" alt="Venture capital partner logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB274Xm29OYb6A7Cu-5Z1WyxFmVm8HBVPo9hTbOqZf8mu3xjNOkLI5e31MwyR6oebIg0EOTBmTQWlP4LTYqqsiAy8-Poi5Xpf6kPvWsgQNp5yeYd9m5YP28mNPdXgF73IvQIxxwcBDWOzghesY9JJXfrbBroIyV-xsmVyQFHwiMFKofUPTpkJlZPQB9vwaOtbZMmEtZWMsdJMPkikCJeN9S4aPvEiNY9W6aqZqjyR5gOOXc-g0LuX2ZFIBDcAV-nTjOUh58sHWmVWE" />
              </div>
            </div>

            {/* Glassmorphic Chat Interface Demo */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative glass rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="flex gap-2 mb-8">
                  <div className="size-3 rounded-full bg-red-500/50"></div>
                  <div className="size-3 rounded-full bg-yellow-500/50"></div>
                  <div className="size-3 rounded-full bg-green-500/50"></div>
                </div>
                {/* Chat Messages */}
                <div className="space-y-6 mb-8">
                  <div className="flex justify-end">
                    <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                      <p className="text-sm font-medium text-white/90">Swap 100 USDC to ETH and stake it on Lido</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xs text-white">smart_toy</span>
                    </div>
                    <div className="glass border-white/5 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                      <p className="text-sm text-white/80 mb-3">Understood. Preparing transaction sequence:</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 bg-black/30 p-2 rounded-lg border border-white/5">
                          <span className="material-symbols-outlined text-primary text-sm">swap_horiz</span>
                          <span className="text-xs">1. Swap 100 USDC → 0.042 ETH</span>
                        </div>
                        <div className="flex items-center gap-3 bg-black/30 p-2 rounded-lg border border-white/5">
                          <span className="material-symbols-outlined text-primary text-sm">account_balance</span>
                          <span className="text-xs">2. Deposit 0.042 ETH to Lido</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="bg-primary text-[10px] font-bold px-3 py-1.5 rounded-md">Confirm</button>
                        <button className="glass border-white/10 text-[10px] font-bold px-3 py-1.5 rounded-md">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Input Bar */}
                <div className="relative">
                  <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all text-white placeholder-slate-400" placeholder="Type your transaction..." type="text" />
                  <button className="absolute right-2 top-1.5 bg-primary size-8 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-white">arrow_upward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="mt-32 md:mt-48">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for the <span className="text-primary">Next Billion</span> Users</h2>
              <p className="text-slate-500">Traditional Web3 is complex. ChainSpeak removes the friction by combining large language models with audited smart contract execution.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="glass group p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300">
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary">forum</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Natural Language</h3>
                <p className="text-sm text-slate-400 leading-relaxed">No more complex UIs; just type what you want to execute your transactions instantly.</p>
              </div>
              {/* Card 2 */}
              <div className="glass group p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300">
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Secure & Fast</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Audited smart contracts and lightning-fast execution for complete peace of mind.</p>
              </div>
              {/* Card 3 */}
              <div className="glass group p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300">
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary">hub</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Multi-Chain</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Seamlessly swap assets across Ethereum, Polygon, and Arbitrum from one chat window.</p>
              </div>
              {/* Card 4 */}
              <div className="glass group p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300">
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Gas Optimization</h3>
                <p className="text-sm text-slate-400 leading-relaxed">AI-driven route finding to save on fees and optimize your capital across protocols.</p>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="mt-20 flex flex-wrap justify-center gap-12 border-y border-white/5 py-12">
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Network Status</p>
              <p className="text-2xl font-bold">Mainnet Beta</p>
              <p className="text-emerald-400 text-sm font-medium mt-1">100% Operational</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Testing Access</p>
              <p className="text-2xl font-bold">Free Forever</p>
              <p className="text-primary text-sm font-medium mt-1">Open for Devs</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Transaction Volume</p>
              <p className="text-2xl font-bold">$14.2M+</p>
              <p className="text-slate-400 text-sm font-medium mt-1">Processed safely</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-32 relative">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
            <div className="relative glass rounded-3xl p-12 md:p-24 text-center border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[160px] text-white">language</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to simplify your <br />Web3 experience?</h2>
              <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the thousands of users already using ChainSpeak to manage their portfolios without the headache of complex DeFi dashboards.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl shadow-primary/30 transition-all">
                  Launch App Now
                </button>
                <button className="glass border border-white/20 hover:bg-white/5 px-10 py-5 rounded-xl font-bold text-xl transition-all">
                  Read Documentation
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 py-12 px-6 lg:px-20 bg-black/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-lg">auto_awesome</span>
                </div>
                <h2 className="text-lg font-bold">ChainSpeak</h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Revolutionizing the way humanity interacts with the blockchain through the power of AI and natural language.
              </p>
              <div className="flex gap-4">
                <Link className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">public</span></Link>
                <Link className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">share</span></Link>
                <Link className="text-slate-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">groups</span></Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Protocol</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link className="hover:text-white transition-colors" href="#">How it works</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Smart Contracts</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Security Audit</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Governance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Developers</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link className="hover:text-white transition-colors" href="#">API Docs</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">SDK Reference</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Whitepaper</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Open Source</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Stay Updated</h4>
              <p className="text-sm text-slate-500 mb-4">Get the latest news about AI-blockchain integration.</p>
              <div className="flex gap-2">
                <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary/50 text-white" placeholder="Email address" type="email" />
                <button className="bg-primary size-10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm text-white">send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-500">© 2024 ChainSpeak AI. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-slate-500">
              <Link className="hover:text-white" href="#">Privacy Policy</Link>
              <Link className="hover:text-white" href="#">Terms of Service</Link>
              <Link className="hover:text-white" href="#">Cookie Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
