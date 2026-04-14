export const metadata = {
  title: 'About | Why This War',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">About Why This War</h1>
      <p className="text-gray-600 mb-4">
        Why This War provides clear, neutral, factual explainers for major armed conflicts around the world.
        We answer the 5 essential questions about each conflict: What is happening, Who is involved, Why it started,
        What is the latest news, and Where it is occurring.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Our Methodology</h2>
      <p className="text-gray-600 mb-4">
        Each conflict explainer is written based on multiple credible sources. We strive for factual accuracy and
        political neutrality. We present the context needed to understand a conflict without advocating for any side.
        All content is reviewed and updated regularly as conflicts evolve.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Update Policy</h2>
      <p className="text-gray-600 mb-4">
        Conflict explainers are reviewed monthly or when significant events change the situation.
        Each page shows its last update date. The "Latest" section is updated most frequently.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Sources</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Wire services: Reuters, AP, AFP</li>
        <li>Think tanks: ISW, CSIS, Crisis Group, RAND</li>
        <li>UN agencies: OCHA, UNHCR, WFP, UNICEF</li>
        <li>Human rights organizations: HRW, Amnesty International</li>
        <li>Regional specialists and academic researchers</li>
      </ul>
    </div>
  )
}
