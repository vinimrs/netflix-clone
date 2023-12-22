'use client';
import React from 'react';
import { Children, ISession } from '@types';
import Loading from 'src/components/Loading';

const UserLayout: React.FC<Children> = ({ children }) => {
	return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
};

export default UserLayout;

