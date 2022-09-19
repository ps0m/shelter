interface IPropsTitle {
  amount: number
  currentPage: number
  title: string
}

const Title = ({ amount, currentPage, title }: IPropsTitle) => (
  <div className="information__title">
    <h3>
      {title}
      {' '}
      (
      {amount}
      )
    </h3>
    <h3>
      Page #
      {currentPage}
    </h3>

  </div>
);

export default Title;
