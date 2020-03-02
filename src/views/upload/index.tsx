import React, { useState } from 'react';
import { Button, Progress, Table, Upload } from 'antd';
import request from 'utils/request';

const DEFAULT_LENGTH = 2;

interface MyFile {
	file: Blob;
	name: string;
}

interface UploadResponse {
	name: string;
}

function BigImageUpload() {
	function createFileChunk(file: File, length: number = DEFAULT_LENGTH) {
		const fileChunkList = [];
		const chunkSize = Math.floor(file.size / length);
		let cur = 0;
		while (cur < file.size) {
			fileChunkList.push({
				file: file.slice(cur, cur + chunkSize),
				name: file.name,
			});
			cur += chunkSize;
		}
		return fileChunkList;
	}

	async function uploadChunks (fileList: Array<MyFile>) {
		const requestList = fileList.map((file, index) => ({
			chunk: file.file,
			filename: file.name,
			hash: file.name + '-' + index,
		})).map(async (chunk) => request.post('/file-api/upload', chunk));
		await Promise.all(requestList);
	}

	async function sendMergeRequest(file: File, length: number = DEFAULT_LENGTH) {
		await request.post('/file-api/merge', {
			filename: file.name,
			size: Math.floor(file.size / length),
		});
	}

	async function handleUploadFile(file: File) {
		const uploadLIst = createFileChunk(file);
		await uploadChunks(uploadLIst);
		await sendMergeRequest(file);
	}

	return (
		<div>
			<Upload
				onChange={({ file }) => handleUploadFile(file as unknown as File)}
				beforeUpload={() => false}
			>
				<Button>上传文件</Button>
			</Upload>
		</div>
	)
}

export default BigImageUpload;
