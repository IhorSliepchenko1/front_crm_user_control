const Footer = () => {
  const yyyy = new Date().getFullYear();

  return <footer className="text-[10px] flex justify-center items-center">© Copyright {yyyy}</footer>;
};

export default Footer;
