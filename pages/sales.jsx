import { useEffect, useState } from "react";

function SalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      setSales(data);
    })
    .catch((err) => {
      return <p>fale to load</p>;
    });

  if (!sales) {
    return <p>loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.id} - #{sale.title}
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  const transformedData = [];

  for (const userId in data) {
    transformedData.push({
      id: userId,
      desc: data[+userId].title,
      status: data[+userId].completed,
    });
  }
  return { props: { sales: transformedData }, revalidate: 10 };
}

export default SalesPage;
