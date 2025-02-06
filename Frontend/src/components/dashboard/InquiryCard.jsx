const InquiryCard = ({inquiry}) => {
	return (
		<div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
			<div className="border-t border-gray-200">
				<dl>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Message
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{inquiry.message}
						</dd>
					</div>
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Email
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{inquiry.contact_email}
						</dd>
					</div>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Phone
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{inquiry.contact_phone}
						</dd>
					</div>
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Time Stamp
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{inquiry.created_at}
						</dd>
					</div>
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Status
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{inquiry.status}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};


export default InquiryCard;