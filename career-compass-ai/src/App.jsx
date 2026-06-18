import React, { useMemo, useState } from 'react';
import {
  ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Compass, GraduationCap,
  Layers3, LineChart, Plus, Search, Sparkles, Target, Users, X
} from 'lucide-react';

const roles = {
  Finance: [
    { title: 'Investment Banking', match: 92, bearing: 45, compensation: 'London £65k-£95k total first year', skills: ['Accounting', 'Valuation', 'Excel', 'PowerPoint', 'Commercial judgment'], overview: 'Advises companies on M&A, IPOs, capital raising and strategic transactions.', day: 'Build valuation models, create pitch decks, research industries, join deal calls and respond to live client requests.', style: 'Highly structured, fast-paced, competitive, detail-heavy.' },
    { title: 'Private Equity', match: 85, bearing: 70, compensation: 'London £75k-£110k entry-level total', skills: ['Financial modelling', 'Due diligence', 'Market research', 'Investment judgment'], overview: 'Invests in private companies, improves operations and exits through sale or IPO.', day: 'Screen targets, build LBO models, read CIMs, evaluate management teams and prepare investment committee materials.', style: 'Analytical, investment-led, thesis-driven.' },
    { title: 'Asset Management', match: 81, bearing: 110, compensation: 'London £45k-£75k graduate total', skills: ['Markets', 'Portfolio theory', 'Research', 'Risk', 'Communication'], overview: 'Manages portfolios for clients across equities, bonds, alternatives and multi-asset strategies.', day: 'Research securities, monitor portfolio exposures, discuss markets and prepare client/investment updates.', style: 'Research-heavy, market-aware, long-term.' },
    { title: 'Hedge Funds', match: 78, bearing: 132, compensation: 'London £70k-£150k+ total, variable', skills: ['Investment research', 'Statistics', 'Risk', 'Catalyst analysis'], overview: 'Generates returns using active strategies across equities, credit, macro, quant and derivatives.', day: 'Form theses, test data, monitor catalysts, debate positions and update risk assumptions.', style: 'Independent, performance-driven, intellectually intense.' },
    { title: 'Quant Trading', match: 74, bearing: 160, compensation: 'London £100k-£200k+ total, variable', skills: ['Python', 'Statistics', 'Probability', 'Algorithms', 'Markets'], overview: 'Uses maths, data and programming to identify trading opportunities and manage risk.', day: 'Analyse datasets, backtest models, improve signals, monitor P&L and refine trading logic.', style: 'Technical, mathematical, high-speed.' },
    { title: 'Equity Research', match: 83, bearing: 95, compensation: 'London £50k-£80k graduate total', skills: ['Accounting', 'Writing', 'Valuation', 'Industry research'], overview: 'Analyses listed companies and publishes investment views for clients or internal teams.', day: 'Update models, read results, write notes, speak with companies and communicate recommendations.', style: 'Analytical, writing-focused, market-facing.' }
  ],
  Consulting: [
    { title: 'Strategy Consulting', match: 89, bearing: 315, compensation: 'London £55k-£90k total first year', skills: ['Problem solving', 'Slide writing', 'Client communication', 'Data analysis'], overview: 'Helps executives solve high-stakes growth, market entry, pricing and transformation problems.', day: 'Structure problems, analyse data, run interviews, build slides and present recommendations.', style: 'Ambiguous, collaborative, communication-heavy.' },
    { title: 'Operations Consulting', match: 80, bearing: 285, compensation: 'London £45k-£75k graduate total', skills: ['Process mapping', 'Analytics', 'Stakeholder management', 'Implementation'], overview: 'Improves how organisations run, from supply chains to cost reduction and operational redesign.', day: 'Map processes, quantify inefficiencies, interview teams, design operating models and track implementation.', style: 'Practical, stakeholder-heavy, execution-oriented.' },
    { title: 'Technology Consulting', match: 77, bearing: 250, compensation: 'London £40k-£70k graduate total', skills: ['Systems thinking', 'Data', 'Cloud basics', 'Client delivery'], overview: 'Connects business problems with technology solutions, digital transformation and systems delivery.', day: 'Gather requirements, analyse workflows, support implementations and explain technical options to clients.', style: 'Hybrid business-tech, structured, client-facing.' }
  ],
  Technology: [
    { title: 'Product Management', match: 78, bearing: 225, compensation: 'London £45k-£85k graduate total', skills: ['User research', 'Product strategy', 'Communication', 'Analytics'], overview: 'Defines what products should be built, why they matter and how teams should prioritise.', day: 'Talk to users, review metrics, write product specs, align engineering/design and make roadmap trade-offs.', style: 'Ambiguous, cross-functional, user-centred.' },
    { title: 'Software Engineering', match: 55, bearing: 200, compensation: 'London £45k-£90k graduate total', skills: ['Programming', 'Algorithms', 'System design', 'Testing'], overview: 'Builds software products, infrastructure and systems used by customers or internal teams.', day: 'Write code, review pull requests, debug issues, design features and collaborate with product/design.', style: 'Technical, maker-focused, problem-solving.' },
    { title: 'Data Science', match: 72, bearing: 175, compensation: 'London £45k-£80k graduate total', skills: ['Python', 'SQL', 'Statistics', 'Machine learning', 'Storytelling'], overview: 'Uses data to answer business questions, predict outcomes and guide product or strategy decisions.', day: 'Clean data, build models, run experiments, create dashboards and explain insights to stakeholders.', style: 'Analytical, exploratory, evidence-led.' }
  ]
};

const initialApps = [
  { company: 'Goldman Sachs', position: 'Summer Analyst', industry: 'Finance', applied: '2026-01-12', deadline: '2026-01-20', status: 'Interview' },
  { company: 'McKinsey', position: 'Business Analyst Intern', industry: 'Consulting', applied: '2026-01-08', deadline: '2026-01-18', status: 'OA' },
  { company: 'Stripe', position: 'Product Intern', industry: 'Technology', applied: '2026-01-05', deadline: '2026-01-30', status: 'Applied' },
  { company: 'BlackRock', position: 'Investments Analyst', industry: 'Finance', applied: '2025-12-18', deadline: '2026-01-10', status: 'Final Round' },
  { company: 'BCG', position: 'Associate Intern', industry: 'Consulting', applied: '2025-12-12', deadline: '2025-12-31', status: 'Offer' }
];

const allRoles = Object.values(roles).flat();

function Badge({ children }) { return <span className="badge">{children}</span>; }
function Progress({ value }) { return <div className="progress"><span style={{ width: `${value}%` }} /></div>; }

function Header({ page, setPage }) {
  const nav = ['Home', 'Career DNA', 'Career Match', 'Career Explorer', 'Roadmap', 'Application Tracker'];
  return <header className="header">
    <button className="brand" onClick={() => setPage('Home')}><Compass size={26}/><span>Career Compass AI</span></button>
    <nav>{nav.map(n => <button key={n} className={page === n ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>)}</nav>
    <button className="navCta" onClick={() => setPage('Career DNA')}>Start DNA</button>
  </header>;
}

function CompassDial({ matches = allRoles.slice(0,5) }) {
  return <div className="compassDial" aria-label="Career match compass visual">
    <div className="ring ring1"/><div className="ring ring2"/><div className="ring ring3"/>
    <div className="axis horizontal"/><div className="axis vertical"/>
    <span className="north">N</span><span className="south">S</span><span className="east">E</span><span className="west">W</span>
    {matches.map((m, i) => {
      const r = 128 - m.match * 0.78;
      const rad = (m.bearing - 90) * Math.PI / 180;
      const x = Math.cos(rad) * r;
      const y = Math.sin(rad) * r;
      return <button className="pin" key={m.title} style={{ transform: `translate(${x}px, ${y}px)` }} title={`${m.title}: ${m.match}%`}><span>{i + 1}</span></button>;
    })}
    <Compass className="compassIcon" size={34}/>
  </div>;
}

function Home({ setPage }) {
  return <main>
    <section className="hero section">
      <div className="heroText">
        <Badge>Behavioral-first career discovery · optional Bazi insight</Badge>
        <h1>Discover who you are. Explore career paths. Build your future.</h1>
        <p>Career Compass AI helps students move from confusion to a clear career plan across finance, consulting and technology.</p>
        <div className="actions"><button className="primary" onClick={() => setPage('Career DNA')}>Start your Career DNA <ArrowRight size={18}/></button><button className="secondary" onClick={() => setPage('Career Explorer')}>Explore careers</button></div>
      </div>
      <div className="heroCard"><CompassDial/><div className="miniStats"><span>Top match</span><strong>Investment Banking · 92%</strong><small>High analytical fit with structured, fast-paced work.</small></div></div>
    </section>
    <section className="section grid3">
      {[['Assess Yourself', 'Understand traits, strengths and working preferences.', Sparkles], ['Explore Careers', 'Learn what roles actually do and what skills they require.', Search], ['Track Progress', 'Turn your target role into a roadmap and application pipeline.', BarChart3]].map(([t,d,Icon]) => <div className="card" key={t}><Icon/><h3>{t}</h3><p>{d}</p></div>)}
    </section>
    <section className="section split"><div><h2>Built for students before they know exactly what to apply for.</h2><p>Most tools start at applications. Career Compass starts earlier: career discovery, fit, skills and preparation.</p></div><div className="journey">{['Discover Yourself','Find Matches','Identify Skill Gaps','Build Roadmap','Track Applications'].map((x,i)=><div key={x}><span>{i+1}</span>{x}</div>)}</div></section>
  </main>;
}

function CareerDNA({ profile, setProfile, setPage }) {
  const [form, setForm] = useState(profile);
  const interests = ['Markets / investing', 'Building products', 'Problem solving', 'Writing / research', 'Public speaking', 'Data / numbers'];
  const toggle = (item) => setForm(f => ({...f, interests: f.interests.includes(item) ? f.interests.filter(x=>x!==item) : [...f.interests, item]}));
  const submit = (e) => { e.preventDefault(); setProfile(form); setPage('Career Match'); };
  const traits = computeTraits(form);
  return <main className="section pageGrid">
    <form className="panel" onSubmit={submit}><Badge>Career DNA Assessment</Badge><h2>Tell us how you think and work.</h2>
      <div className="formGrid"><label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>University<input value={form.university} onChange={e=>setForm({...form,university:e.target.value})}/></label><label>Degree<input value={form.degree} onChange={e=>setForm({...form,degree:e.target.value})}/></label><label>Year<select value={form.year} onChange={e=>setForm({...form,year:e.target.value})}><option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Graduate</option></select></label></div>
      <h3>Interests</h3><div className="chips">{interests.map(i=><button type="button" className={form.interests.includes(i)?'chip selected':'chip'} onClick={()=>toggle(i)} key={i}>{i}</button>)}</div>
      <h3>Behavioral questions</h3>
      <label>Do you prefer data or people?<select value={form.dataPeople} onChange={e=>setForm({...form,dataPeople:e.target.value})}><option>Mostly data</option><option>Balanced</option><option>Mostly people</option></select></label>
      <label>Do you enjoy open-ended problem solving?<select value={form.problemSolving} onChange={e=>setForm({...form,problemSolving:e.target.value})}><option>Yes, very much</option><option>Sometimes</option><option>Prefer clear tasks</option></select></label>
      <label>Structure or flexibility?<select value={form.structure} onChange={e=>setForm({...form,structure:e.target.value})}><option>Structure</option><option>Balanced</option><option>Flexibility</option></select></label>
      <label>Competitive environment?<select value={form.competition} onChange={e=>setForm({...form,competition:e.target.value})}><option>High energy motivates me</option><option>Neutral</option><option>I prefer calm environments</option></select></label>
      <details><summary>Add optional Bazi / Life Pattern details</summary><div className="formGrid"><label>Date of birth<input type="date" value={form.birthDate} onChange={e=>setForm({...form,birthDate:e.target.value})}/></label><label>Time of birth<input type="time" value={form.birthTime} onChange={e=>setForm({...form,birthTime:e.target.value})}/></label><label>Place of birth<input placeholder="e.g. Tianjin" value={form.birthPlace} onChange={e=>setForm({...form,birthPlace:e.target.value})}/></label></div><p className="note">Used as one reflective lens, not as prediction or fortune telling.</p></details>
      <button className="primary wide" type="submit">Generate Career Match <ArrowRight size={18}/></button></form>
    <aside className="panel sticky"><Badge>Live Report</Badge><h2>{form.name || 'Your'} Career DNA</h2>{Object.entries(traits).map(([k,v])=><div className="metric" key={k}><div><span>{k}</span><strong>{v}%</strong></div><Progress value={v}/></div>)}<div className="insight"><h3>Strengths</h3><p>Strategic thinking, fast learning, structured communication.</p><h3>Development areas</h3><p>Consistency, delegation, patience under slow feedback loops.</p></div></aside>
  </main>;
}

function computeTraits(f) {
  const analytical = 70 + (f.interests.includes('Data / numbers') ? 15 : 0) + (f.dataPeople === 'Mostly data' ? 8 : 0);
  const communication = 68 + (f.interests.includes('Public speaking') ? 12 : 0) + (f.dataPeople === 'Mostly people' ? 8 : 0);
  const creativity = 58 + (f.interests.includes('Building products') ? 15 : 0) + (f.structure === 'Flexibility' ? 8 : 0);
  const leadership = 72 + (f.competition === 'High energy motivates me' ? 10 : 0);
  const risk = 62 + (f.competition === 'High energy motivates me' ? 12 : 0) + (f.structure === 'Flexibility' ? 6 : 0);
  return { 'Analytical Thinking': Math.min(96, analytical), Leadership: Math.min(94, leadership), Communication: Math.min(92, communication), 'Risk Appetite': Math.min(91, risk), Creativity: Math.min(90, creativity) };
}

function CareerMatch({ profile, setPage }) {
  const matches = allRoles.sort((a,b)=>b.match-a.match).slice(0,5);
  return <main className="section"><div className="pageHead"><Badge>Career Match Engine</Badge><h1>Your top career bearings</h1><p>Ranked using behavioral signals, interests and working-style fit. Bazi is optional and treated as a reflective layer.</p></div><div className="matchGrid"><div className="panel"><CompassDial matches={matches}/><div className="baziCard"><Badge>Optional Life Pattern Insight</Badge><h3>Metal-leaning profile demo</h3><p>This reflective layer suggests comfort with precision, structure and independent judgment. It supports finance research, IB and quant-style roles, but does not override behavioral fit.</p></div></div><div className="matchList">{matches.map((m,i)=><div className="matchCard" key={m.title}><div><span className="rank">#{i+1}</span><h3>{m.title}</h3><p>{m.overview}</p><div className="skillRow">{m.skills.slice(0,4).map(s=><span key={s}>{s}</span>)}</div></div><div className="score"><strong>{m.match}%</strong><small>match</small><button onClick={()=>setPage('Career Explorer')}>View role</button></div></div>)}</div></div></main>;
}

function CareerExplorer() {
  const [industry, setIndustry] = useState('Finance');
  const [selected, setSelected] = useState(roles.Finance[0]);
  const changeIndustry = (i) => { setIndustry(i); setSelected(roles[i][0]); };
  return <main className="section"><div className="pageHead"><Badge>Career Explorer</Badge><h1>Browse roles by industry.</h1><p>Understand what each role does, what skills it requires and how the work style differs.</p></div><div className="tabs">{Object.keys(roles).map(i=><button className={i===industry?'activeTab':''} key={i} onClick={()=>changeIndustry(i)}>{i}</button>)}</div><div className="explorer"><aside>{roles[industry].map(r=><button key={r.title} className={selected.title===r.title?'role activeRole':'role'} onClick={()=>setSelected(r)}><BriefcaseBusiness size={18}/><span>{r.title}</span><small>{r.match}% match</small></button>)}</aside><section className="panel"><Badge>{industry}</Badge><h2>{selected.title}</h2><p className="largeText">{selected.overview}</p><div className="detailGrid"><div><h3>Typical day</h3><p>{selected.day}</p></div><div><h3>Compensation</h3><p>{selected.compensation}</p></div><div><h3>Expected work style</h3><p>{selected.style}</p></div><div><h3>Required skills</h3><div className="skillRow">{selected.skills.map(s=><span key={s}>{s}</span>)}</div></div></div></section></div></main>;
}

function Roadmap() {
  const months = ['September','October','November','December','January','February','March','April','May','June','July','August'];
  const tasks = ['Learn accounting fundamentals','Build valuation and Excel modelling skill','Prepare CV, LinkedIn and story bank','Network with alumni and research firms','Submit spring/summer applications','Practise OA and case/technical interviews','Final rounds and offer decisions','Reflect on conversion data','Deepen role-specific skill gaps','Complete internship prep','Build project portfolio','Review goals and update roadmap'];
  return <main className="section"><div className="pageHead"><Badge>Skill Gap + Roadmap</Badge><h1>12-month plan for Investment Banking.</h1><p>Generated from target role requirements and current skill profile.</p></div><div className="roadGrid"><div className="panel"><h2>Skill gap analysis</h2>{[['Excel',60,85],['Accounting',25,80],['Valuation',15,85],['Networking',35,75]].map(([s,c,r])=><div className="gap" key={s}><div><strong>{s}</strong><span>Current {c}% · Target {r}%</span></div><Progress value={c}/></div>)}</div><div className="timeline">{months.map((m,i)=><div className="month" key={m}><span>{m}</span><h3>{tasks[i]}</h3><p>{i<4?'Foundation building':i<8?'Application execution':'Portfolio and review'}</p></div>)}</div></div></main>;
}

function Tracker() {
  const [apps,setApps] = useState(initialApps);
  const [modal,setModal] = useState(false);
  const [filter,setFilter] = useState('All');
  const filtered = filter === 'All' ? apps : apps.filter(a=>a.status===filter);
  const offers = apps.filter(a=>a.status==='Offer').length;
  const interviews = apps.filter(a=>['Interview','Final Round','Offer'].includes(a.status)).length;
  const success = Math.round(offers / Math.max(1, apps.filter(a=>['Offer','Rejected'].includes(a.status)).length) * 100);
  return <main className="section"><div className="trackerHead"><div><Badge>Application Tracker</Badge><h1>Your recruiting pipeline.</h1></div><button className="primary" onClick={()=>setModal(true)}><Plus size={18}/> Add application</button></div><div className="stats"><Stat icon={BriefcaseBusiness} label="Applications" value={apps.length}/><Stat icon={Users} label="Interviews" value={interviews}/><Stat icon={CheckCircle2} label="Offers" value={offers}/><Stat icon={LineChart} label="Success rate" value={`${success}%`}/></div><div className="panel"><div className="tableTools"><div className="chips">{['All','Applied','OA','Interview','Final Round','Offer','Rejected'].map(s=><button className={filter===s?'chip selected':'chip'} key={s} onClick={()=>setFilter(s)}>{s}</button>)}</div></div><div className="tableWrap"><table><thead><tr><th>Company</th><th>Position</th><th>Industry</th><th>Applied</th><th>Deadline</th><th>Status</th></tr></thead><tbody>{filtered.map((a,i)=><tr key={i}><td>{a.company}</td><td>{a.position}</td><td>{a.industry}</td><td>{a.applied}</td><td>{a.deadline}</td><td><span className={`status ${a.status.replace(' ','')}`}>{a.status}</span></td></tr>)}</tbody></table></div></div>{modal && <AddModal setModal={setModal} setApps={setApps}/>}</main>;
}
function Stat({icon:Icon,label,value}) { return <div className="stat"><Icon/><span>{label}</span><strong>{value}</strong></div> }
function AddModal({ setModal, setApps }) { const [a,setA]=useState({company:'',position:'',industry:'Finance',applied:'2026-02-01',deadline:'2026-02-15',status:'Interested'}); return <div className="modal"><form className="modalBox" onSubmit={e=>{e.preventDefault();setApps(x=>[a,...x]);setModal(false)}}><button type="button" className="close" onClick={()=>setModal(false)}><X/></button><h2>Add application</h2><div className="formGrid">{['company','position','applied','deadline'].map(k=><label key={k}>{k}<input value={a[k]} type={k.includes('date')||['applied','deadline'].includes(k)?'date':'text'} onChange={e=>setA({...a,[k]:e.target.value})}/></label>)}<label>Industry<select value={a.industry} onChange={e=>setA({...a,industry:e.target.value})}><option>Finance</option><option>Consulting</option><option>Technology</option></select></label><label>Status<select value={a.status} onChange={e=>setA({...a,status:e.target.value})}>{['Interested','Applied','OA','Interview','Final Round','Offer','Rejected'].map(s=><option key={s}>{s}</option>)}</select></label></div><button className="primary wide">Save application</button></form></div> }

export default function App() {
  const [page,setPage] = useState('Home');
  const [profile,setProfile] = useState({ name: 'Junjia', university: 'LSE', degree: 'BSc Economics', year: 'Year 2', interests: ['Markets / investing','Problem solving','Data / numbers'], dataPeople: 'Mostly data', problemSolving: 'Yes, very much', structure: 'Structure', competition: 'High energy motivates me', birthDate: '', birthTime: '', birthPlace: '' });
  const Current = useMemo(() => ({ Home: <Home setPage={setPage}/>, 'Career DNA': <CareerDNA profile={profile} setProfile={setProfile} setPage={setPage}/>, 'Career Match': <CareerMatch profile={profile} setPage={setPage}/>, 'Career Explorer': <CareerExplorer/>, Roadmap: <Roadmap/>, 'Application Tracker': <Tracker/> })[page], [page, profile]);
  return <><Header page={page} setPage={setPage}/>{Current}<footer><div><Compass/> Career Compass AI</div><p>Behavioral-first career discovery with optional Bazi insight. Built as an MVP prototype.</p></footer></>;
}
