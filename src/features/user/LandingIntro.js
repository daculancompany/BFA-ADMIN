function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12 text-center"> {/* Center content */}
        <div className="max-w-md mx-auto"> {/* Center div horizontally */}
          <h1 className='text-3xl font-bold'>
            <img src="/logo192.png" className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />
            Bureau of Fire Protection
          </h1>
          <div className="mt-12">
            <img src="./intro.png" alt="" className="w-48 inline-block" />
          </div>
          <h1 className="text-2xl mt-8 font-bold">Welcome to Bureau of Fire Protection</h1>
          <p className="py-2 mt-4">✓ <span className="font-semibold">Real-time Monitoring</span> and Alerts</p>
          <p className="py-2">✓ <span className="font-semibold">Incident Reporting</span> and Analysis</p>
          <p className="py-2">✓ <span className="font-semibold">Scheduling Inspections</span> and Maintenance</p>
          <p className="py-2">✓ User-friendly <span className="font-semibold">Documentation</span></p>
        </div>
      </div>
    </div>
  )
}

export default LandingIntro;
