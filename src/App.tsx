import { Tldraw, track, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';
import { useYjsStore } from './useYjsStore';

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://yjs.heshe.tech'


export default function App() {

	// 获取当前的URL路径
	const pathname = window.location.pathname;

	// 提取路径中的值作为persistenceKey
	const persistenceKey = pathname.split('/').pop(); // 假设最后一段为所需的key

	// 拼接roomId
	const roomId = `he-draw-${persistenceKey}`;

	const store = useYjsStore({
		roomId: roomId,
		hostUrl: HOST_URL,
	})

	return (
		<div className="tldraw__editor" style={{ position: 'fixed', inset: 0 }}>
			<Tldraw autoFocus
				store={store}
				components={{
					SharePanel: NameEditor,
				}}
				assetUrls={{
					fonts: {
						// 替换字体为沐瑶随心手写体
						draw: '/Muyao-Softbrush.ttf',
					},
				}} />
		</div>
	)
}


const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user.getUserPreferences()

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
