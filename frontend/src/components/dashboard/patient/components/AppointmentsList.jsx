import Card from "./ui/Card";
import AppointmentItem from "./AppointmentItem";

const AppointmentsList = ({
  appointments,
  title,
  subtitle,
  showActions = true,
  onBookNew,
  onViewDetails,
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title subtitle={subtitle}>{title}</Card.Title>
        {onBookNew && <Card.Link onClick={onBookNew}>+ Book New</Card.Link>}
      </Card.Header>
      <Card.Content className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <AppointmentItem
              key={appt.id}
              appointment={appt}
              showActions={showActions}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📅</div>
            <h4 className="text-sm font-semibold text-white mb-1">
              No appointments
            </h4>
            <p className="text-xs text-white/60">
              Book your first appointment to get started
            </p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default AppointmentsList;
