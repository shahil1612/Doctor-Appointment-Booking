import Card from "./ui/Card";
import Badge from "./ui/Badge";

const BillItem = ({ bill }) => {
  const statusVariant = {
    paid: "confirmed",
    due: "pending",
    overdue: "cancelled",
  }[bill.status];

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
      <div className="text-2xl">🧾</div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-white">{bill.name}</h4>
        <p className="text-xs text-white/60">{bill.date}</p>
      </div>
      <div className="text-base font-semibold text-white font-mono">
        {bill.amount}
      </div>
      <Badge variant={statusVariant}>
        {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
      </Badge>
    </div>
  );
};

const BillingList = ({ bills, title, onDownloadAll }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        {onDownloadAll && (
          <Card.Link onClick={onDownloadAll}>Download All</Card.Link>
        )}
      </Card.Header>
      <Card.Content className="space-y-2">
        {bills.map((bill, index) => (
          <BillItem key={index} bill={bill} />
        ))}
      </Card.Content>
    </Card>
  );
};

export default BillingList;
