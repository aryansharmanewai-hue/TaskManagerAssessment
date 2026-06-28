import React, { useState } from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	border-radius: 4px;
	cursor: pointer;
	background: ${(props) => getStatusBg(props.status)};
	color: white;
	font-weight: 500;
	font-size: 13px;
	transition: all 0.2s ease;

	&:hover {
		opacity: 0.85;
	}
`;

const StatusDropdown = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	background: white;
	border: 1px solid #e2e4e6;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 100;
	min-width: 180px;
	margin-top: 4px;
`;

const StatusOption = styled.div`
	padding: 10px 12px;
	cursor: pointer;
	font-size: 13px;
	display: flex;
	align-items: center;
	gap: 8px;
	color: #172b4d;

	&:hover {
		background: #f2f2f2;
	}

	${(props) => props.isActive && `
		background: ${getStatusBg(props.status)};
		color: white;
	`}
`;

const getStatusBg = (status) => {
	const colors = {
		'todo': '#8590a2',
		'in-progress': '#0079bf',
		'in-review': '#ff9f1a',
		'completed': '#61bd4f',
		'blocked': '#eb5a46',
	};
	return colors[status] || '#8590a2';
};

const getStatusLabel = (status) => {
	const labels = {
		'todo': '📝 To Do',
		'in-progress': '🚀 In Progress',
		'in-review': '👀 In Review',
		'completed': '✅ Completed',
		'blocked': '🚫 Blocked',
	};
	return labels[status] || 'To Do';
};

const TaskStatus = ({ status = 'todo', onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const statuses = ['todo', 'in-progress', 'in-review', 'completed', 'blocked'];

	const handleSelect = (newStatus) => {
		onChange(newStatus);
		setIsOpen(false);
	};

	return (
		<div style={{ position: 'relative' }}>
			<StatusContainer status={status} onClick={() => setIsOpen(!isOpen)}>
				{getStatusLabel(status)}
			</StatusContainer>

			{isOpen && (
				<StatusDropdown>
					{statuses.map((s) => (
						<StatusOption
							key={s}
							status={s}
							isActive={s === status}
							onClick={() => handleSelect(s)}
						>
							{getStatusLabel(s)}
						</StatusOption>
					))}
				</StatusDropdown>
			)}
		</div>
	);
};

export default TaskStatus;
