import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	title: '',
	backgroundImageLink: '',
	isImage: true,
	lists: [],
	members: [],
	activity: [],
	loading: true,
	description: '',
	activityLoading: false,
	taskCount: 0,
	completedTaskCount: 0,
	totalEffortEstimated: 0,
	totalEffortActual: 0,
};

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		successFetchingBoard: (state, action) => {
			state.id = action.payload._id;
			state.title = action.payload.title;
			state.backgroundImageLink = action.payload.backgroundImageLink;
			state.isImage = action.payload.isImage;
			state.lists = action.payload.lists;
			state.members = action.payload.members;
			state.activity = action.payload.activity;
			state.description = action.payload.description;
			state.taskCount = action.payload.taskCount || 0;
			state.completedTaskCount = action.payload.completedTaskCount || 0;
			state.totalEffortEstimated = action.payload.totalEffortEstimated || 0;
			state.totalEffortActual = action.payload.totalEffortActual || 0;
		},
		updateTitle: (state, action) => {
			state.title = action.payload;
		},
		setActivityLoading: (state, action) => {
			state.activityLoading = action.payload;
		},
		updateActivity: (state, action) => {
			state.activity = action.payload;
		},
		updateDescription: (state, action) => {
			state.description = action.payload;
		},
		updateBackground: (state, action) => {
			const { background, isImage } = action.payload;
			state.backgroundImageLink = background;
			state.isImage = isImage;
		},
		addMembers: (state,action)=>{
			state.members = action.payload;
		}
	},
});

export const {
	setLoading,
	successFetchingBoard,
	updateTitle,
	setActivityLoading,
	updateActivity,
	updateDescription,
	updateBackground,
	addMembers,
} = boardSlice.actions;
export default boardSlice.reducer;
