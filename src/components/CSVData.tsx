interface CSVDataProps {
  data: string[][];
}

export function CSVData(props: CSVDataProps) {
  const csvData = props.data;
  if (!csvData || csvData.length === 0) {
    return <p>No data to display.</p>;
  }

  const headers = csvData.map((item, index) => <th key={index}>{item}</th>);
  const rows = props.data.slice(1).map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
