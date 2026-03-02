export function HomePage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-border rounded-lg p-6 bg-card">
            <div className="h-4 w-24 bg-muted rounded mb-2" />
            <div className="h-8 w-16 bg-muted rounded" />
          </div>
        ))}
      </div>

      <div className="mt-6 border border-border rounded-lg p-6 bg-card">
        <div className="h-6 w-32 bg-muted rounded mb-4" />
        <div className="h-48 bg-muted rounded" />
      </div>
    </div>
  );
}
