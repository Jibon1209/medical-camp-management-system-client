import SectionTitle from "../../../Components/SectionTitle";

const OrganizerProfile = () => {
  return (
    <div className="">
      <SectionTitle
        heading="add an item"
        subHeading="What's new?"
      ></SectionTitle>
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Our service statistics
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Total free servers
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  1.6M
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Servers a month
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  19.2K
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Servers a week
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  4.9K
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Total users
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  166.7K
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
