import { createClient } from '@/lib/supabase/serverClient'

export default async function TestPage() {
  const supabase = await createClient()

  // Test database connection by fetching categories
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            ❌ Database Connection Error
          </h1>
          <p className="text-gray-700 mb-4">
            Make sure you've run the SQL scripts in Supabase Dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
            <li>Go to Supabase Dashboard → SQL Editor</li>
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">supabase/schema.sql</code></li>
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">supabase/rls-policies.sql</code></li>
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">supabase/seed.sql</code> (optional)</li>
          </ol>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              Error Details
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">✅</span>
            <h1 className="text-3xl font-bold text-green-600">
              Supabase Connected Successfully!
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Database Connection Test
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-600 font-medium">Status</p>
                <p className="text-green-600 font-bold text-lg">Connected</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 font-medium">Categories Found</p>
                <p className="text-blue-600 font-bold text-lg">
                  {categories?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {categories && categories.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📦 Categories from Database
              </h2>
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-lg text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Slug: <code className="bg-gray-100 px-2 py-0.5 rounded">
                        {category.slug}
                      </code>
                    </p>
                    {category.description && (
                      <p className="text-gray-600 mt-2">{category.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                ⚠️ No Categories Found
              </h2>
              <p className="text-yellow-700 text-sm">
                Your database is connected, but there are no categories yet.
                Run the <code className="bg-yellow-100 px-2 py-1 rounded">seed.sql</code> script
                to add sample data.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">🎉 You're all set!</h3>
            <p className="text-gray-600 text-sm mb-4">
              Your Supabase backend is ready. Check out the setup guide for code examples:
            </p>
            <div className="flex gap-3">
              <a
                href="/SETUP_GUIDE.md"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                📚 View Setup Guide
              </a>
              <a
                href="https://app.supabase.com/project/rornrpgqxemctbessiwb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                🔗 Open Supabase Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
