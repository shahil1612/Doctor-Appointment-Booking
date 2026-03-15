import Card from "../../ui/Card";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";

const CareTeamMemberCard = ({ member }) => {
  return (
    <div className="flex flex-col gap-3 p-4 border border-white/10 bg-white/5 rounded-xl hover:border-[#60a5fa]/50 hover:bg-white/10 transition-all">
      <div className="flex items-center gap-3">
        <Avatar initials={member.initials} color={member.color} size="lg" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{member.name}</h4>
          <p className="text-xs text-white/70">{member.spec}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm" className="flex-1">
          📅 Book
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          💬 Message
        </Button>
      </div>
    </div>
  );
};

const CareTeamList = ({ careTeam, title, subtitle, onFindSpecialist }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title subtitle={subtitle}>{title}</Card.Title>
        {onFindSpecialist && (
          <Card.Link onClick={onFindSpecialist}>Find Specialist</Card.Link>
        )}
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {careTeam.map((member, index) => (
            <CareTeamMemberCard key={index} member={member} />
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default CareTeamList;
