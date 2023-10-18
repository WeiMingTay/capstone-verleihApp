package de.neuefische.backend.tools;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolRepository extends MongoRepository<Tool, String> {
}
