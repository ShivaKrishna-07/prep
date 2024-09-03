
type DriveFile = {
    id: string;
    name: string;
    webViewLink: string;
  };

interface SyllabusPageProps {
  branch: string;
  files: DriveFile[];
}
//
const SyllabusPage: React.FC<SyllabusPageProps> = ({ branch, files }) => {

  console.log(files);
  

  return (
    <div className="h-screen w-full">
      <h1 className="text-2xl font-bold mb-4">Syllabus for {branch.toUpperCase()}</h1>
      {files.length > 0 ? (
        <ul>
          {files.map(file => (
            <li key={file.id}>
              <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No syllabus files found for this branch.</p>
      )}
    </div>
  );
};

export default SyllabusPage;
