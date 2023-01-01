import React, { useState } from "react";
import { Container } from "../container/Container";
import { PortfolioHigth, PortfolioConteiner } from "./PortfolioBox.styled";
import { useSelector } from "react-redux";
import { GeneralButton } from "components/generalButton/GeneralButton.styled";
import MyWork from "components/myWork/MyWork";
import Modal from "components/modal/Modal";
import ModalAddWork from "components/modalAddWork/ModalAddWork";
import { useAllWorksQuery } from "redux/worksAPI";
import Loader from "components/loader/ Loader";

const PortfolioBox = ({ mainInfo }) => {
  const [modal, setModal] = useState(false);
  const admin = useSelector((state) => state.admin);
  const { data: allWorks } = useAllWorksQuery();

  return (
    <PortfolioHigth>
      <Container>
        <PortfolioConteiner>
          {allWorks ? (
            <>
              {Object.entries(allWorks).map((el) => (
                <MyWork key={el[0]} work={el[1]} mainInfo={mainInfo} />
              ))}
            </>
          ) : (
            <Loader />
          )}
          {admin ? (
            <>
              <GeneralButton
                variant={"contained"}
                bts={"submit"}
                onClick={() => {
                  setModal(true);
                }}
                type="button"
              >
                Add new work
              </GeneralButton>
              {modal ? (
                <Modal
                  onModalClose={() => {
                    setModal(false);
                  }}
                >
                  <ModalAddWork
                    onModalClose={() => {
                      setModal(false);
                    }}
                  />
                </Modal>
              ) : null}
            </>
          ) : null}
        </PortfolioConteiner>
      </Container>
    </PortfolioHigth>
  );
};

export default PortfolioBox;
