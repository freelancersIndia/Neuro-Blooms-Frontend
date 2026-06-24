import React from 'react';
import QuestionnaireForm from './QuestionnaireForm';

export const Step2Questionnaire = ({ onSubmit, onFormValuesChange, defaultValues }) => {
  return (
    <div className="w-full">
      <QuestionnaireForm 
        onSubmit={onSubmit}
        onFormValuesChange={onFormValuesChange}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default Step2Questionnaire;
