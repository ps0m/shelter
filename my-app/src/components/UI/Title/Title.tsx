interface IPropsTitle {
  amountCars: number
  currentPage: number
}

const Title = ({ amountCars, currentPage }: IPropsTitle) => {
  return (
    <div>
      <h3>Garage ({amountCars})</h3>
      <h3>Page #{currentPage}</h3>

    </div>
  );
};

export default Title;