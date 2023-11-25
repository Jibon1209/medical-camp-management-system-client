import PropTypes from "prop-types";

const SectionTitle = ({ heading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8">
      <h3 className="text-3xl uppercase font-semibold border-y-4 py-4">
        {heading}
      </h3>
    </div>
  );
};
SectionTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
export default SectionTitle;
