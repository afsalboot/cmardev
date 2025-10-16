

const Card = ({ title, value, color }) => (
  <div
    className="summary-card"
    style={{
      background: `linear-gradient(135deg, ${color}, #b39ddb)`,
    }}
  >
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default Card;
