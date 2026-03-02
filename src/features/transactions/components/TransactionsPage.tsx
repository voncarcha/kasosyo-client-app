export function TransactionsPage() {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border border-border rounded-lg p-4 bg-card flex items-center gap-4">
            <div className="h-10 w-10 bg-muted rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-muted rounded mb-2" />
              <div className="h-3 w-24 bg-muted rounded" />
            </div>
            <div className="h-5 w-16 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
