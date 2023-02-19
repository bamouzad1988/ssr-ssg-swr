import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummyBackend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps() {
  const data = await getData();
  if (!data) {
    return { redirect: { destination: "/no-data" } };
  }
  if (data.products.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
export default HomePage;
