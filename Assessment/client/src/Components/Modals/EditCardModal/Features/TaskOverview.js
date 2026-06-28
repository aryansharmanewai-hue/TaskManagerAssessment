import React from 'react';
import styled from 'styled-components';

const OverviewContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 12px;
	padding: 16px;
	background: #f8f9fa;
	border-radius: 8px;
`;

const StatCard = styled.div`
	background: white;
	border: 1px solid #e2e4e6;
	border-radius: 6px;
	padding: 12px;
	text-align: center;
`;

const StatLabel = styled.div`
	font-size: 11px;
	font-weight: 600;
	color: #5e6c84;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 6px;
`;

const StatValue = styled.div`
	font-size: 24px;
	font-weight: 700;
	color: #172b4d;
`;

const ProgressBar = styled.div`
	height: 6px;
	background: #dfe1e6;
	border-radius: 3px;
	overflow: hidden;
	margin-top: 8px;
`;

const ProgressFill = styled.div`
	height: 100%;
	background: #61bd4f;
	width: ${(props) => `${props.percentage}%`};
	transition: width 0.3s ease;
`;

const SubLabel = styled.div`
	font-size: 12px;
	color: #5e6c84;
	margin-top: 4px;
`;

const TaskOverview = ({ 
	taskCount = 0, 
	completedTaskCount = 0,
	totalEffortEstimated = 0,
	totalEffortActual = 0
}) => {
	const completionPercentage = taskCount > 0 
		? Math.round((completedTaskCount / taskCount) * 100) 
		: 0;

	const effortPercentage = totalEffortEstimated > 0 
		? Math.min(100, Math.round((totalEffortActual / totalEffortEstimated) * 100))
		: 0;

	return (
		<OverviewContainer>
			<StatCard>
				<StatLabel>Total Tasks</StatLabel>
				<StatValue>{taskCount}</StatValue>
				<SubLabel>Across all lists</SubLabel>
			</StatCard>

			<StatCard>
				<StatLabel>Completion</StatLabel>
				<StatValue>{completionPercentage}%</StatValue>
				<ProgressBar>
					<ProgressFill percentage={completionPercentage} />
				</ProgressBar>
				<SubLabel>{completedTaskCount}/{taskCount} done</SubLabel>
			</StatCard>

			<StatCard>
				<StatLabel>Estimated Effort</StatLabel>
				<StatValue>{totalEffortEstimated}h</StatValue>
				<SubLabel>Total hours</SubLabel>
			</StatCard>

			<StatCard>
				<StatLabel>Effort Tracking</StatLabel>
				<StatValue>{effortPercentage}%</StatValue>
				<ProgressBar>
					<ProgressFill percentage={effortPercentage} />
				</ProgressBar>
				<SubLabel>{totalEffortActual}h/{totalEffortEstimated}h</SubLabel>
			</StatCard>
		</OverviewContainer>
	);
};

export default TaskOverview;
