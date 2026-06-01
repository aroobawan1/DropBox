import FileUploader from "./components/FileUploader";
import FileList from "./components/FileList";
import DragDrop from "./components/DragDrop";

function App() {
  return (
    <div  
      style={{
        maxWidth: '100%',
        padding: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        }} >
      <p 
      style={{ 
        margin: 0,
        color: 'black'
        }}>
        My Files
      </p>
      <FileUploader/>
        <DragDrop/>
        <FileList/>
          </div>
  );
}

export default App;