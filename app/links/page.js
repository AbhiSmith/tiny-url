import Image from "next/image";
import LinkCreateForm from "./creteForm"
// import LinkCreateHtmlForm from "./createHtmlForm"
import LinkHtmlTable from './table'


export default function LinksPage() {
  return (
      
        <div className="justify-center flex-col mt-12">
          < LinkCreateForm />
          <LinkHtmlTable />
        </div>
      
  );
}


