# View My StartUp

# **{스프린트1기 1팀}**

팀 협업 [노션 링크: [https://www.notion.so/c53f7e74366d4e99b092d8a63e62d73f?v=ed50033a7c7e4b6b9dc37608e88a0318&pvs=4](https://www.notion.so/c53f7e74366d4e99b092d8a63e62d73f?pvs=21)]

## **팀원 구성**

## 탁우현 [개인 Github 링크: https://github.com/WooHyunTak] 
## 박상훈 [개인 Github 링크: https://github.com/dieuaimer] 
## 임송이 [개인 Github 링크: https://github.com/Im-amberim] 
---

## **프로젝트 소개**

- 스타트업 정보 확인 및 모의 투자 서비스
    
    > 최근에는 벤처 캐피탈에 비해 개인 투자자들의 스타트업에 대한 관심이 증가하고 있습니다. 하지만 스타트업에 관한 정보 접근성에는 여전히 큰 격차가 존재합니다. 이러한 상황을 개선하기 위해, 개인 투자자들이 스타트업을 선택하여 그들의 누적 투자 금액, 매출액 등을 확인하고 비교할 수 있는 모의 투자 서비스를 제작합니다.
    > 
- 프로젝트 기간: 2024.08.13 ~ 2024.09.03

---

## **기술 스택**

- Frontend: JavaScript, React.js
- Backend: Express.js, PrismaORM
- Database: PostgreSQL
- 공통 Tool: Git & Github, Discord, Notion

---

## **팀원별 구현 기능 상세**

### **탁우현**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- 나의 기업비교 페이지
    - 최근 선택한 기업의 로컬스토리지 활용
        - 선택한 기업의 정보를 로컬스토리지로 저장 후 페이지로드 저장한 값을 불러온다
    - 기업 비교 확인
        - 비교 결과 확인하기
            - 나의 기업, 선택한 비교기업의 리스트의 id를  API로 전달 해당 리스트를 불러온다
        - 기업 순위 확인하기
            - 나의 기업 id를 API  전달 데이터베이스에서 상위/하위 2개의 데이터를 추가로 불러온다.
    - 나의 기업에 투자하기
        - 기업의 투자하기 createInvestment API 호출 생성이 완료되면 해당 기업의 상세 페이지로 이동한다 ( useNavigate )
- 공통 Modal component
    - 투자 생성 모달
        - 기업 상세와 비교 페이지에서 사용할 공용 모달 작성
    - Alert 모달
        - 메시지를 프롭으로 받고 해당 메시지를 보여주는 공용 모달 작성
- 커스텀 훅
    - 유효성검사 커스텀 훅 

### **박상훈**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- 기업 상세 페이지
    - CompanyDetail 컴포넌트
        - 주요 역할
            - 기업 상세 정보를 로드하여 페이지에 표시하고, 사용자가 기업에 투자할 수 있는 기능을 제공
        - 상태 관리
            - `useState`, `useEffect`, `useContext`를 활용해 상태 관리 및 데이터 로드 처리
            - `useParams`: URL에서 `companyId`를 추출하여 해당 기업의 정보를 로드
            - `InvestmentContext`: 가상 투자 데이터를 전역적으로   관리하기 위해 컨텍스트 사용
            - `companyData` : 기업의 상세 정보와 관련된 상태(예: 기업 이름, 카테고리, 매출, 직원 수, 투자 정보 등)
            - `queryParams`: 페이지네이션 및 데이터 로딩을 위한 쿼리 파라미터 상태
            - `loading` 및 `error`: 데이터 로딩 상태 및 에러 처리
        - 주요 기능
            - `fetchCompany` 함수: 기업의 상세 데이터를 API를 통해 가져오고, 가져온 데이터를 상태에 저장
            - `handleQueryParamsChange`: 페이지네이션 및 기타 쿼리 파라미터의 변화를 처리
            
    - DetailPageDropdown 컴포넌트
        - 주요 역할
            - 투자 내역에 대한 수정 및 삭제 기능을 제공하는 드롭다운 메뉴
        - 상태 관리
            - 드롭다운 메뉴의 가시성(visible) 및 모달의 상태(삭제, 업데이트, 알림 모달 등) 관리
            - `previousModal`: 이전에 열렸던 모달을 추적하여 모달의 상태 전환 처리
            - `pendingDelete`: 삭제 작업이 대기 중인 상태 관리
        - 주요 기능
            - 드롭다운 토글 기능: `toggleDropdown` 함수를 통해 드롭다운 메뉴의 가시성 토글
            - 삭제 및 업데이트 모달 열기/닫기 기능
            - 삭제 확인 및 업데이트 처리: 사용자가 입력한 비밀번호를 검증하여 투자 내역을 삭제하거나 업데이트하는 로직 처리
            
    - InvestmentContext 컨텍스트 및 프로바이더
        - 주요 역할
            - 투자 내역을 전역적으로 관리하고, 다른 컴포넌트가 이를 쉽게 접근하고 조작할 수 있도록 함
        - 상태 관리
            - `investments`: 현재 투자 내역의 리스트 상태
            - `version`: 투자 데이터의 버전 관리 상태로, 데이터가 변경될 때마다 버전을 업데이트하여 연관된 컴포넌트가 이를 감지할 수 있도록 함
        - 주요 기능
            - `loadInvestments`: 새로운 투자 데이터를 로드하고, 데이터가 변경되었을 때 버전을 업데이트
            - `addInvestmetn`: 새로운 투자를 추가하고 상태를 업데이트
            - `updateInvestmentById`: 특정 투자 내역을 업데이트하고 상태를 갱신
            - `deleteInvestmentById`: 특정 투자 내역을 삭제하고 상태를 갱신
            - `InvestmentContext.Provider`를 통해 상태와 기능을 하위 컴포넌트에게 제공

### **임송이**

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **기업 목록 (메인 페이지)**
    - fetch(GET)를 사용하여 정렬종류에 따라 스타트업 순위 리스트업
    - fetch(GET)으로 기업명, 기업소개 관련 단어 검색 기능 (SearchBar 컴포넌트)
- **투자 현황 페이지**
    - fetch(GET)를 사용하여 정렬종류에 따라 스타트업 순위 리스트업
- **비교 현황 페이지**
    - fetch(GET)를 사용하여 정렬종류에 따라 스타트업 순위 리스트업
- **공용 컴포넌트**
    - MainHeader 메인 네비게이션 구현
    - 공용 Table, TableData, LogoImg 컴포넌트 구현
    - 공용 DropDown 컴포넌트 구현
    - 공용 ErrorMsg(에러 메세지), Loader(로딩 애니매이션) 구현
    - 공용 Pagination 구현

---

## **파일 구조**

```

src
├── App.jsx
├── assets
│   ├── btn_plus.svg
│   ├── btn_visibility_on_24px-1.svg
│   ├── btn_visibility_on_24px.svg
│   ├── default_company_img.svg
│   ├── default_logo_companyDetail.svg
│   ├── default_logo_companyDetail_small.svg
│   ├── icon
│   │   ├── ic_add.svg
│   │   ├── ic_arrow_left-small.svg
│   │   ├── ic_arrow_left.svg
│   │   ├── ic_arrow_right.svg
│   │   ├── ic_arrow_right_small.svg
│   │   ├── ic_check.svg
│   │   ├── ic_check_small.svg
│   │   ├── ic_delete.svg
│   │   ├── ic_kebab.svg
│   │   ├── ic_minus.svg
│   │   ├── ic_restart.svg
│   │   ├── ic_restart_white.svg
│   │   ├── ic_search.svg
│   │   └── ic_toggle.svg
│   ├── logo_desktop.svg
│   ├── logo_loading.svg
│   └── logo_mobile.svg
├── components
│   ├── CompanyHeader
│   │   ├── CompanyHeader.css
│   │   └── CompanyHeader.jsx
│   ├── CompanyInfo
│   │   ├── CompanyInfo.css
│   │   └── CompanyInfo.jsx
│   ├── CompanyInvestmentTable
│   │   ├── CompanyInvestmentTable.css
│   │   └── CompanyInvestmentTable.jsx
│   ├── Comparison
│   │   ├── Comparison.css
│   │   └── Comparison.jsx
│   ├── DropDown
│   │   ├── DetailPageDropdown.css
│   │   ├── DetailPageDropdown.jsx
│   │   ├── DropDown.css
│   │   └── DropDown.jsx
│   ├── ErrorMsg
│   │   ├── ErrorMsg.css
│   │   └── ErrorMsg.jsx
│   ├── Loader
│   │   ├── Loader.css
│   │   └── Loader.jsx
│   ├── LogoImg
│   │   ├── LogoImg.css
│   │   └── LogoImg.jsx
│   ├── MainHeader
│   │   ├── MainHeader.css
│   │   └── MainHeader.jsx
│   ├── Pagination
│   │   ├── Pagination.css
│   │   └── Pagination.jsx
│   ├── SearchBar
│   │   ├── SearchBar.css
│   │   └── SearchBar.jsx
│   ├── Table
│   │   ├── ColGroup.jsx
│   │   ├── Table.css
│   │   └── Table.jsx
│   ├── TableData
│   │   ├── TableData.css
│   │   └── TableData.jsx
│   └── modals
│       ├── AlertModal.css
│       ├── AlertModal.jsx
│       ├── CreateInvestment.jsx
│       ├── DeleteConfirmModal.jsx
│       ├── SelectComparisonCompany.jsx
│       ├── SelectMyCompany.jsx
│       ├── UpdateConfirmModal.jsx
│       ├── UpdateModal.jsx
│       └── globalModal.css
├── contexts
│   └── InvestmentContext.jsx
├── hooks
│   ├── useApiHandler.jsx
│   ├── useErrorHandler.jsx
│   └── useFormValidation.jsx
├── index.js
├── pages
│   ├── CheckInComparison.css
│   ├── CheckInComparison.jsx
│   ├── CompanyDetail.css
│   ├── CompanyDetail.jsx
│   ├── ComparisonStatus.jsx
│   ├── Home.css
│   ├── Home.jsx
│   ├── InvestmentStatus.jsx
│   ├── Layout.css
│   ├── Layout.jsx
│   └── MyComparison.jsx
├── services
│   ├── companyApi.js
│   ├── comparisonApi.js
│   └── investmentApi.js
└── utils
    ├── buttonOptions.js
    ├── convertToUnit.js
    ├── formatDescription.jsx
    ├── global.css
    └── tableTypes.js
```

---

## **구현 홈페이지**

[https://view-my-startup-project.netlify.app](https://view-my-startup-project.netlify.app/)
