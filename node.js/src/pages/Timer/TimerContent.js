import React from 'react';

const TimerContent = () => {
    return (
        <div className='container py-3'>
            <h2 className='pomo-title py-md-3 mb-4'>Pomodoro Technique to boost your productivity</h2>
            <h3 className='pomo-title text-dark mb-3'>What is Pomodoro ?</h3>
            <p className='pomo-content mb-4'>
                Pomodoro is a popular time management technique created by Francesco Cirillo for a more productive way to work and study.
                This technique is combination of todo list and 25-minute time in length, seperated by short-breaks to focus on work/study.
                Pomodoro, is an Italian word for 'tomato', to focus on work Cirillo used tomato-shaped kitchen timer when he was a university student.
            </p>

            <h3 className='pomo-title text-dark mb-3'>How to use Pomodoro timer ?</h3>
            <ol className='pomo-content'>
                <li className='mb-2'>Add <b>tasks</b> to work on today.</li>
                <li className='mb-2'>Set time for <b>25-minute</b> and focus on single task until timer rings.</li>
                <li className='mb-2'>If task is completed, check the task or continue <b>step-2</b>. Now act increments automatically for repeated task.</li>
                <li className='mb-2'>Enjoy <b>5-minute short break</b> for every task completion.</li>
                <li className='mb-2'>After four pomodoros, take a longer break of <b>15-30 minute.</b></li>
            </ol>

            <h3 className='pomo-title text-dark mb-3'>Basic Features</h3>
            <ul className='pomo-content'>
                <li className='mb-2'>
                    <b>Estimate Finish Time: </b>
                    For each completed task you can get an estimate of time required to complete daily tasks.
                </li>
                <li className='mb-2'>
                    <b>Completed List: </b>
                    You can see your finished tasks and time in tabular form and can download your reports
                </li>
                <li className='mb-2'>
                    <b>Visual Reports: </b>
                    You can visually see the estimated time you focused on daily basis.
                </li>
                <li className='mb-2'>
                    <b>No Ads: </b>
                    You can enjoy distraction-free app experience.
                </li>
            </ul>
        </div>
    )
}

export default TimerContent;