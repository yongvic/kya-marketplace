import { ChevronDown, Search, User, ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export default function Header() {
	const h = useTranslations('Header');
	return (
		<>
			<div className="w-full h-24 flex flex-row justify-between items-center px-18 border-b border-gray-300">

				<div>
	  			<Image
					src={"/logo.png"}
					alt="Logo"
					width={130}
					height={130}
				/>
			</div>

			<div className="flex flex-row items-center gap-10 text-lg font-medium">
				<p>{h('m-acceuil')}</p>
				<div className="flex flex-row items-center gap-1">
					<p>{h('m-logiciel')}</p>
					<ChevronDown/>
				</div>
				<div className="flex flex-row items-center gap-1">
					<p>{h('m-a-propos')}</p>
					<ExternalLink/>
				</div>
				
			</div>
			<div className="flex flex-row items-center gap-5">
				<User/>
				<Search/>
			</div>

			</div>
		</>
	);
}