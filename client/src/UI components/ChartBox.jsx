

const ChartBox = ({ title, children }) => (
  <div className="chart-box">
    <h2>{title}</h2>
    <div className="chart-wrapper">{children}</div>
  </div>
);

export default ChartBox