import React, { useState } from 'react';
import styled from 'styled-components';

const PriorityContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	border-radius: 4px;
	cursor: pointer;
	background: ${(props) => getPriorityBg(props.priority)};
	color: white;
	font-weight: 500;
	font-size: 13px;
	transition: all 0.2s ease;

	&:hover {
		opacity: 0.8;
	}
`;

const PriorityDropdown = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	background: white;
	border: 1px solid #e2e4e6;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 100;
	min-width: 150px;
	margin-top: 4px;
`;

const PriorityOption = styled.div`
	padding: 8px 12px;
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
		background: ${getPriorityBg(props.priority)};
		color: white;
	`}
`;

const getPriorityBg = (priority) => {
	const colors = {
		urgent: '#eb5a46',
		high: '#ff9f1a',
		medium: '#0079bf',
		low: '#61bd4f',
	};
	return colors[priority] || '#0079bf';
};

const getPriorityLabel = (priority) => {
	const labels = {
		urgent: '🔥 Urgent',
		high: '⬆️ High',
		medium: '➡️ Medium',
		low: '⬇️ Low',
	};
	return labels[priority] || 'Medium';
};

const PriorityBadge = ({ priority = 'medium', onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const priorities = ['low', 'medium', 'high', 'urgent'];

	const handleSelect = (newPriority) => {
		onChange(newPriority);
		setIsOpen(false);
	};

	return (
		<div style={{ position: 'relative' }}>
			<PriorityContainer priority={priority} onClick={() => setIsOpen(!isOpen)}>
				{getPriorityLabel(priority)}
			</PriorityContainer>

			{isOpen && (
				<PriorityDropdown>
					{priorities.map((p) => (
						<PriorityOption
							key={p}
							priority={p}
							isActive={p === priority}
							onClick={() => handleSelect(p)}
						>
							{getPriorityLabel(p)}
						</PriorityOption>
					))}
				</PriorityDropdown>
			)}
		</div>
	);
};

export default PriorityBadge;
