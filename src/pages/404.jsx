import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div
      className="h-screen w-screen select-none"
      style={{
        backgroundImage: `url("https://picsum.photos/1600/900?random=${Math.random()}")`,
      }}
    >
      <div className=" bg-cover bg-background h-full opacity-70 bg-center text-primary flex flex-col justify-center items-center gap-4">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-3xl">Looks like you got lost</h2>
        <Link
          to={"/"}
          className="cursor-pointer bg-primary p-2 rounded opacity-100! text-black hover:bg-accent"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
