package com.kumarvv.sample.cdi;

import org.apache.log4j.Logger;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

/**
 * CDI resources
 */
public class CdiResources {

	@PersistenceContext
	EntityManager em;

	@Produces
	public EntityManager createEm() {
		if (em == null) {
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("TestPU");
			em = emf.createEntityManager();
		}
		return em;
	}

	@Produces
	public Logger getLogger(InjectionPoint injectionPoint) {
		return Logger.getLogger(injectionPoint.getMember().getDeclaringClass());
	}
}
