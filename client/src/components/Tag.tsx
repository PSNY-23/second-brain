
const Tag = ({tag}) => {
  return (
      <div>
          <a href="#" className="bg-lightBlue text-darkBlue px-2 py-1 rounded-full">
              {`#${tag}`}
          </a>
    </div>
  )
}

export default Tag