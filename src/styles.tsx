import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    text-align: center;
    background-color: #E0F2F1;
`;

export const Timer = styled.div`
    font-size: 48px;
    font-weight: bold;
    margin: 20px;
    color: #6A0572;
    
    @media (max-width: 600px) {
        font-size: 32px;
    }
`;

export const Button = styled.button`
    background-color: #FFC1E0;
    color: #6A0572;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FFA5CD;
    }
`;

export const LogsSection = styled.div`
    margin-top: 20px;
    background-color: #FFF0AA;
    padding: 10px;
    border-radius: 5px;
`;

export const Log = styled.li`
    list-style-type: none;
    padding: 5px;
    
    &:nth-child(odd) {
        background-color: #FFE6CC;
    }
`;

export const SessionControlContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const ControlButton = styled.button`
    background-color: #C9C1FF;
    color: #6A0572;
    border: none;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #B2A7FF;
    }

    @media (max-width: 600px) {
        padding: 10px 20px;
    }
`;

export const SessionInfo = styled.span`
    margin: 0 10px;
    color: #6A0572;
`;
