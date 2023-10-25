import { IconButton, Stack, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCloudArrowUp, faFileLines, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import theme from "../../../theme/theme"

interface UploadedFile {
    name: string
    size: number
    progress: number
    status: "uploading" | "uploaded"
}

const MFileUpload = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const files = e.dataTransfer.files

        Array.from(files).forEach((file) => {
            const newFile: UploadedFile = {
                name: file.name,
                size: file.size,
                progress: 0,
                status: "uploading",
            }

            setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, newFile])
            simulateFileUpload(file, newFile)
        })
    }

    const simulateFileUpload = (file: File, uploadedFile: UploadedFile) => {
        const totalSteps = 100
        let currentStep = 0

        const interval = setInterval(() => {
            if (currentStep < totalSteps) {
                const randomIncrement = Math.random() * 10 + 5
                currentStep += randomIncrement

                if (currentStep > totalSteps) {
                    currentStep = totalSteps
                }

                const progress = currentStep

                uploadedFile.progress = progress
                setUploadedFiles((prevUploadedFiles) =>
                    prevUploadedFiles.map((prevFile) =>
                        prevFile.name === uploadedFile.name ? uploadedFile : prevFile
                    )
                )
            } else {
                clearInterval(interval)
                uploadedFile.progress = 100
                uploadedFile.status = "uploaded"
                setUploadedFiles((prevUploadedFiles) =>
                    prevUploadedFiles.map((prevFile) =>
                        prevFile.name === uploadedFile.name ? uploadedFile : prevFile
                    )
                )
            }
        }, 200)

    }

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files) {
            Array.from(files).forEach((file) => {
                const newFile: UploadedFile = {
                    name: file.name,
                    size: file.size,
                    progress: 0,
                    status: "uploading",
                }

                setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, newFile])
                simulateFileUpload(file, newFile)
            })
        }
    }

    const handleDeleteFile = (fileName: string) => {
        setUploadedFiles((prevUploadedFiles) =>
          prevUploadedFiles.filter((file) => file.name !== fileName)
        )
      }

    const formatFileSize = (size: number) => {
        if (size === 0) {
            return '0 Bytes'
        }
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(size) / Math.log(k))
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <Stack spacing={2}>
            <Stack
                spacing={1}
                alignItems="center"
                sx={{
                    padding: '30px 60px 30px 60px',
                    border: '2px dashed',
                    borderColor: theme.palette.text.primary,
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
                onDrop={handleFileDrop}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onClick={handleFileClick}
            >
                <input
                    type="file"
                    accept="*/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />
                <FontAwesomeIcon icon={faCloudArrowUp} size="3x" color={theme.palette.text.primary} />
                <Typography variant="body2">Déposez des fichiers ou cliquez pour ajouter</Typography>
            </Stack>

            {uploadedFiles.length > 0 && (
                <Stack spacing={1}>
                    {uploadedFiles.map((file) => (
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Stack
                                sx={{
                                    background: theme.palette.background.paper,
                                    padding: '20px',
                                    borderRadius: '10px',
                                    width: '100%'
                                }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Stack spacing={2} direction="row" alignItems="center">
                                        <FontAwesomeIcon
                                            icon={faFileLines}
                                            color={theme.palette.text.primary}
                                            size="2x"
                                        />

                                        <Stack>
                                            <Typography variant="body1">{file.name}</Typography>

                                            {file.status === "uploading" && (
                                                <Stack
                                                    style={{
                                                        width: '100%',
                                                        height: '4px',
                                                        background: 'linear-gradient(to right, #1B255F, #1B255F ' +
                                                            `${Math.round(file.progress)}%, transparent ` +
                                                            `${Math.round(file.progress)}%, transparent 100%)`,
                                                    }}
                                                />
                                            )}

                                            {file.status === "uploaded" && (
                                                <Typography variant="body1" sx={{ fontSize: '9px', lineHeight: '9px' }}>
                                                    {formatFileSize(file.size)}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Stack>

                                    {file.status === "uploading" && (
                                        <Typography variant="body1">
                                            {Math.round(file.progress)}%
                                        </Typography>
                                    )}

                                    {file.status === "uploaded" && (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            color={theme.palette.text.primary}
                                        />
                                    )}
                                </Stack>
                            </Stack>

                            <IconButton sx={{ width: '40px', height: '40px', borderRadius: '50%' }} onClick={() => handleDeleteFile(file.name)}>
                                <FontAwesomeIcon icon={faTrashCan} color={theme.palette.text.primary} size="2xs" />
                            </IconButton>
                        </Stack>
                    ))}
                </Stack>
            )}
        </Stack>
    )
}

export default MFileUpload
