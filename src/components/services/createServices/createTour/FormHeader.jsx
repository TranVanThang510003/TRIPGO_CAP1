const FormHeader = ({ title, description }) => (
  <div>
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    {description && <p className="mb-1 text-gray-700">{description}</p>}
  </div>
);

export default FormHeader;
