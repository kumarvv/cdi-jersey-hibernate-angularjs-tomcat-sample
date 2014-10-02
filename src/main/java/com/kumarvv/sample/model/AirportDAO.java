package com.kumarvv.sample.model;

import org.apache.log4j.Logger;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

/**
 *  Sample AirportDAO
 */
public class AirportDAO {

	@Inject
	EntityManager em;

	@Inject
	Logger log;

	public List<Airport> getAll() {
		return em.createQuery("select c from Airport c", Airport.class)
				  .setMaxResults(50)
				  .getResultList();
	}

	public List<Airport> getByString(String str) {
		return em.createQuery("select c from Airport c " +
					  "where c.code like :str or c.name like :str or c.country like :str",
					  Airport.class)
				  .setParameter("str", "%" + str + "%")
				  .setMaxResults(50)
				  .getResultList();
	}

	public Airport getOne(Long id) {
		return em.find(Airport.class, id);
	}

	public Airport getOne(String code) {
		try {
			return em.createQuery("select c from Airport c where c.code = :code", Airport.class)
					  .setParameter("code", code)
					  .getSingleResult();
		} catch (NoResultException nre) {
			log.error(nre);
			return getNoResultObject();
		}
	}

	public Airport insert(Airport airport) {
		try {
			em.getTransaction().begin();
			em.persist(airport);
			em.getTransaction().commit();
		} catch (Exception e) {
			log.error(e);
			em.getTransaction().rollback();
		}
		return airport;
	}

	public Airport update(Airport airport) {
		try {
			em.getTransaction().begin();
			em.merge(airport);
			em.getTransaction().commit();
		} catch (Exception e) {
			log.error(e);
			em.getTransaction().rollback();
		}
		return airport;
	}

	public void remove(Long id) {
		Airport airport = em.find(Airport.class, id);
		try {
			if (airport != null) {
				em.getTransaction().begin();
				em.remove(airport);
				em.getTransaction().commit();
			}
		} catch (Exception e) {
			log.error(e);
			em.getTransaction().rollback();
		}
	}

	public Airport getNoResultObject() {
		return null;
	}
}
