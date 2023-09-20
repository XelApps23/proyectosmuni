import useFile from "@/hooks/useFile";
import { useEffect, useState } from "react";

const Upload = () => {

    const [file, setFile] = useState(null);
    const { uploadFile, loading, progress, downloadURL } = useFile();

    useEffect(() => {
        if (loading) {
            console.log('loading...')
        }
    }, [loading])

    useEffect(() => {
        console.log(progress)
    }, [progress])

    useEffect(() => {
        console.log(downloadURL)
    }, [downloadURL])


    const enviarArchivo = () => {
        if (file) {
            uploadFile(file)
        }
        else {
            console.log('No se ha seleccionado un archivo')
        }
    }

    const getFile = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <>
            <input type="file" onChange={getFile} accept="application/pdf">
            </input>
            <button onClick={enviarArchivo}>Enviar</button>
        </>
    )
}

export default Upload;