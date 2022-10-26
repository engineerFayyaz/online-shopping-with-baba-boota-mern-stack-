import dynamic from "next/dynamic";
import Header from "../../subcomponents/header";
import Footer from "../../subcomponents/footer";


const GlobalLayout = (props) => {
  if (props.error) {
    return <>{props.children}</>;
  }
console.log("props",props)
  return (
    <>
    {
      (
        <>
       <Header/>{props.children}<Footer />
       </>
      )
    }
     
    </>
  );
};

export default GlobalLayout;
