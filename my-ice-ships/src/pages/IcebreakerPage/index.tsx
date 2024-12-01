import "./InstallSoftwareRequestPage.css";
import {Container} from "react-bootstrap";
import {Related} from "../../core/api/Api.ts";
import {SoftwareInRequestCard} from "../../components/SoftwareInRequestCard";
import {ISoftwareInRequestCardProps} from "../../components/SoftwareInRequestCard/typing.tsx";
import {Breadcrumbs} from "../../components/Breadcrumbs";

import {useInstallSoftwareRequestPage} from "./useInstallSoftwareRequestPage.ts";

function calculateTotalPrice(softwareItems?: (Related | undefined)[]): number {
    return softwareItems?.reduce((total, item) => {
        if (item && item.software) {
            return total + item.software.price;
        }
        return total;
    }, 0) || 0;
}

export const InstallSoftwareRequestPage = () => {
        const {
            installSoftwareRequestContentData,
            isEditable,
            host,
            id,
            updVersion,
            handleClickDelete,
            handleChangeHost,
            handleClearClick,
            handleFormClick,
        } = useInstallSoftwareRequestPage()

        return (
            <Container className="mb-4">
                <Breadcrumbs
                    middleItems={[
                        {
                            name: "Каталог",
                            link: "/software_catalog"
                        }
                    ]}
                    endItem={"Заказ на установку ПО № " + installSoftwareRequestContentData?.pk}
                />
                <div className="card card-body mb-3 mt-4 row g-0">
                    <div className="row g-0">
                        <div className="col-md-2">
                            <h5 className="card-title">Сервер пользователя</h5>
                        </div>
                        <div className="col-md-2">
                            {
                                isEditable ?
                                    <input
                                        type="text"
                                        className="input form-control"
                                        aria-label="host"
                                        value={host}
                                        onChange={handleChangeHost}
                                    />
                                    :
                                    <input
                                        type="text"
                                        className="input form-control"
                                        aria-label="host"
                                        value={host}
                                        readOnly
                                    />
                            }
                        </div>
                    </div>
                </div>

                {installSoftwareRequestContentData?.software_list && !!installSoftwareRequestContentData.software_list.length ? (
                    <>
                        {installSoftwareRequestContentData.software_list.map((software: Related, index: number) => {
                            const props: ISoftwareInRequestCardProps = {
                                id: software.software.pk,
                                title: software.software.title,
                                summary: software.software.summary,
                                price: software.software.price,
                                logoFilePath: software.software.logo_file_path,
                                version: software.version,
                                isEditable: isEditable,
                                isrID: id || "",
                                handleClickDelete: handleClickDelete,
                                handleUpdateVersion: updVersion,
                            };
                            return (
                                <SoftwareInRequestCard key={index} {...props} />
                            );
                        })}
                    </>
                ) : (
                    <></>
                )}
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-10">
                            <div className="card-body">
                                <h5 className="card-title">
                                    ИТОГО:
                                </h5>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-body">
                                <strong>{calculateTotalPrice(installSoftwareRequestContentData?.software_list)} руб.</strong>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isEditable ?
                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn dark-blue-border me-3"
                                onClick={handleClearClick}
                            >
                                Очистить
                            </button>
                            <button
                                type="button"
                                className="btn dark-blue-btn"
                                onClick={handleFormClick}
                            >
                                Оформить
                            </button>
                        </div>
                        :
                        <></>
                }
            </Container>
        );
    }
;