import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Details.module.css";

interface IPokemonId {
  name: string;
  type: [];
  stats: {
    name: string;
    value: number;
  }[];
  image: string;
}
interface Props{
  pokemon:IPokemonId
}

export const getServerSideProps:GetServerSideProps = async({params}) => {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params?.id}.json`
  );
  return{
    props:{
      pokemon:await res.json()
    }
  }
}

const Details:React.FC<Props> = ({pokemon}) => {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">Back to home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attributes}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
