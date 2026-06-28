import React, { useState } from 'react';
import styled from 'styled-components';

const TagsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const TagsLabel = styled.label`
	font-size: 12px;
	font-weight: 600;
	color: #5e6c84;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

const TagsInputContainer = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

const TagInput = styled.input`
	flex: 1;
	padding: 8px 12px;
	border: 1px solid #dfe1e6;
	border-radius: 4px;
	font-size: 13px;

	&:focus {
		outline: none;
		border-color: #0079bf;
		box-shadow: 0 0 0 2px rgba(0, 121, 191, 0.15);
	}
`;

const AddButton = styled.button`
	padding: 8px 16px;
	background: #0079bf;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: #055a8c;
	}
`;

const TagsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

const Tag = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 6px 10px;
	background: #deebf7;
	color: #0079bf;
	border-radius: 16px;
	font-size: 12px;
	font-weight: 500;
`;

const RemoveButton = styled.button`
	background: none;
	border: none;
	color: #0079bf;
	cursor: pointer;
	font-size: 14px;
	padding: 0;
	display: flex;
	align-items: center;

	&:hover {
		color: #055a8c;
	}
`;

const TaskTags = ({ tags = [], onTagsChange }) => {
	const [inputValue, setInputValue] = useState('');

	const handleAddTag = () => {
		const trimmedValue = inputValue.trim();
		if (trimmedValue && !tags.includes(trimmedValue)) {
			onTagsChange([...tags, trimmedValue]);
			setInputValue('');
		}
	};

	const handleRemoveTag = (tagToRemove) => {
		onTagsChange(tags.filter((tag) => tag !== tagToRemove));
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddTag();
		}
	};

	return (
		<TagsContainer>
			<TagsLabel>🏷️ Tags</TagsLabel>

			<TagsInputContainer>
				<TagInput
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Add tag (e.g., backend, bug-fix)"
				/>
				<AddButton onClick={handleAddTag}>Add</AddButton>
			</TagsInputContainer>

			{tags.length > 0 && (
				<TagsList>
					{tags.map((tag, index) => (
						<Tag key={index}>
							{tag}
							<RemoveButton onClick={() => handleRemoveTag(tag)}>
								×
							</RemoveButton>
						</Tag>
					))}
				</TagsList>
			)}
		</TagsContainer>
	);
};

export default TaskTags;
