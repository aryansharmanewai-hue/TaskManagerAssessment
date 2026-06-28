import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EstimatorContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 12px;
	background: #f8f9fa;
	border-radius: 4px;
	border: 1px solid #e2e4e6;
`;

const EstimateRow = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	justify-content: space-between;
`;

const Label = styled.span`
	font-size: 12px;
	font-weight: 600;
	color: #5e6c84;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

const InputGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Input = styled.input`
	width: 80px;
	padding: 6px 8px;
	border: 1px solid #dfe1e6;
	border-radius: 3px;
	font-size: 13px;
	text-align: center;

	&:focus {
		outline: none;
		border-color: #0079bf;
		box-shadow: 0 0 0 2px rgba(0, 121, 191, 0.15);
	}
`;

const Select = styled.select`
	padding: 6px 8px;
	border: 1px solid #dfe1e6;
	border-radius: 3px;
	font-size: 13px;
	background: white;
	cursor: pointer;

	&:focus {
		outline: none;
		border-color: #0079bf;
	}
`;

const Button = styled.button`
	padding: 8px 12px;
	background: #0079bf;
	color: white;
	border: none;
	border-radius: 3px;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: #055a8c;
	}

	&:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
`;

const AIBadge = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 2px 8px;
	background: #e6f5ff;
	color: #0079bf;
	border-radius: 12px;
	font-size: 11px;
	font-weight: 600;
`;

const LoadingSpinner = styled.div`
	display: inline-block;
	width: 12px;
	height: 12px;
	border: 2px solid #0079bf;
	border-top-color: transparent;
	border-radius: 50%;
	animation: spin 0.6s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

const EffortEstimator = ({ 
	estimatedEffort = null, 
	actualEffort = null,
	unit = 'hours',
	aiGenerated = false,
	description = '',
	onUpdateEffort,
	onRequestAIEstimate
}) => {
	const [loading, setLoading] = useState(false);
	const [localEstimated, setLocalEstimated] = useState(estimatedEffort || '');
	const [localActual, setLocalActual] = useState(actualEffort || '');
	const [localUnit, setLocalUnit] = useState(unit);

	const handleEstimatedChange = (e) => {
		const value = e.target.value;
		setLocalEstimated(value);
		onUpdateEffort({
			estimated: value ? parseFloat(value) : null,
			actual: localActual ? parseFloat(localActual) : null,
			unit: localUnit,
		});
	};

	const handleActualChange = (e) => {
		const value = e.target.value;
		setLocalActual(value);
		onUpdateEffort({
			estimated: localEstimated ? parseFloat(localEstimated) : null,
			actual: value ? parseFloat(value) : null,
			unit: localUnit,
		});
	};

	const handleUnitChange = (e) => {
		setLocalUnit(e.target.value);
		onUpdateEffort({
			estimated: localEstimated ? parseFloat(localEstimated) : null,
			actual: localActual ? parseFloat(localActual) : null,
			unit: e.target.value,
		});
	};

	const handleAIEstimate = async () => {
		if (!description) {
			alert('Please add a task description first for AI estimation');
			return;
		}

		setLoading(true);
		try {
			const response = await axios.post('/api/card/estimate-task', {
				description,
				title: description.substring(0, 50),
			});

			if (response.data.success) {
				const estimate = response.data.estimate;
				setLocalEstimated(estimate.estimatedEffort);
				onUpdateEffort({
					estimated: estimate.estimatedEffort,
					actual: localActual ? parseFloat(localActual) : null,
					unit: estimate.unit,
					aiGenerated: true,
				});
			}
		} catch (error) {
			console.error('AI estimation failed:', error);
			alert('Failed to generate AI estimate. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<EstimatorContainer>
			<Label>📊 Effort Estimation</Label>

			<EstimateRow>
				<span style={{ fontSize: '12px', color: '#5e6c84' }}>Estimated Effort:</span>
				<InputGroup>
					<Input
						type="number"
						min="0"
						step="0.5"
						value={localEstimated}
						onChange={handleEstimatedChange}
						placeholder="e.g. 5"
					/>
					<Select value={localUnit} onChange={handleUnitChange}>
						<option value="hours">Hours</option>
						<option value="days">Days</option>
						<option value="points">Points</option>
					</Select>
					{aiGenerated && <AIBadge>✨ AI</AIBadge>}
				</InputGroup>
			</EstimateRow>

			<EstimateRow>
				<span style={{ fontSize: '12px', color: '#5e6c84' }}>Actual Effort:</span>
				<InputGroup>
					<Input
						type="number"
						min="0"
						step="0.5"
						value={localActual}
						onChange={handleActualChange}
						placeholder="e.g. 7"
					/>
					<span style={{ fontSize: '12px', color: '#5e6c84' }}>{localUnit}</span>
				</InputGroup>
			</EstimateRow>

			<Button onClick={handleAIEstimate} disabled={loading || !description}>
				{loading ? (
					<>
						<LoadingSpinner /> Estimating...
					</>
				) : (
					'🤖 Get AI Estimate'
				)}
			</Button>
		</EstimatorContainer>
	);
};

export default EffortEstimator;
