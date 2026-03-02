export function DashboardSkeleton() {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex w-[280px] bg-card border-r border-border flex-col">
          <div className="h-16 border-b border-border animate-pulse bg-muted/50" />
          <div className="flex-1 p-4 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-muted rounded-md animate-pulse" />
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b border-border bg-card animate-pulse" />
          <main className="flex-1 p-6">
            <div className="space-y-4">
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
